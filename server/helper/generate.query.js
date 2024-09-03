import jsonSchema from '../prisma/generated-schema.json/json-schema.json' assert { type: 'json' };

export function parseFilters(filterParams, model) {
    const modelSchema = (jsonSchema.definitions)?.[model];
    const whereClause = {};

    if (!modelSchema) {
        return null;
    }

    let hasValidField = false;

    filterParams.forEach((param) => {
        const result = getFieldFromSchemaAndAddCondition(modelSchema, param.id, whereClause, param);
        if (result) {
            hasValidField = true;
        }
    });

    return hasValidField ? whereClause : null;
}

function getFieldFromSchemaAndAddCondition(schema, fieldPath, currentClause, param) {
    const [currentPart, ...restParts] = fieldPath.split('.');


    if (!schema.properties || !schema.properties[currentPart]) {
        return null;
    }

    const field = schema.properties[currentPart];

    // If we've reached the end of the path, add the condition to the whereClause.
    if (restParts.length === 0) {
        currentClause[currentPart] = convertCondition(param.opervalue, param.val, field.type);
        return field;
    }

    // If the field has a reference, resolve the schema and continue recursively.
    if (field.$ref) {
        const refSchemaName = field.$ref.split('/').pop();
        const refSchema = jsonSchema.definitions[refSchemaName];

        if (!currentClause[currentPart]) {
            currentClause[currentPart] = {};
        }

        return getFieldFromSchemaAndAddCondition(refSchema, restParts.join('.'), currentClause[currentPart], param);
    }

    // If the field does not have a reference and there are still parts left, it's invalid.
    return null;
}

function convertCondition(opervalue, val, type) {
    switch (opervalue) {
        case 'equals':
            return { equals: convertValue(val, type) };
        case 'contains':
            return { contains: val, mode: 'insensitive' };
        case 'startsWith':
            return { startsWith: val };
        case 'endsWith':
            return { endsWith: val };
        default:
            return val;
    }
}

function convertValue(value, type) {
    switch (type) {
        case 'integer':
            return parseInt(value);
        case 'number':
            return parseFloat(value);
        case 'boolean':
            return value.toLowerCase() === 'true';
        default:
            return value;
    }
}
