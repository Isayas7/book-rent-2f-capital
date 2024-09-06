Feature: check owner and uploaded book is approved

Scenario: Customer rents an approved book from an approved owner
  Given a customer is logged in with ID 26
  And a book with ID 7 is approved
  And the owner with ID 24 of the book is approved
  When a customer tries to rent the book with ID 7
  Then the customer should expect "success"

Scenario: Customer attempts to rent an unapproved book
  Given a customer is logged in with ID 26
  And a book with ID 8 is not approved
  And the owner with ID 24 of the book is approved
  When a customer tries to rent the book with ID 8
  Then the customer should expect "error"




