Feature: Increase owner wallet after book rental

    Scenario: Owner wallet is updated when a customer rents a book
        Given a customer with ID 26 is logged in
        And an owner with ID 24 has a book with ID 7
        And the book's rent price is 10.00
        When the customer rents the book with ID 7
        Then the owner's wallet should be increased by 10.00

    Scenario: Owner wallet is not updated when rental fails
        Given a customer with ID 26 is logged in
        And an owner with ID 24 has a book with ID 7
        And the book's rent price is 10.00
        When the customer tries to rent the book with ID 7 but fails
        Then the owner's wallet should not be increased