Feature: Update own Book

Scenario: Owner updates their book
  Given a user is logged in with ID 24
  And a user with ID 24 owns a book with ID 7
  When the user tries to update the book with ID 7
  Then a user expect "success" 

Scenario: Non-owner tries to update a book
  Given a user is logged in with ID 25
  And a user with ID 25 does not own a book with ID 7
  When the user tries to update the book with ID 7
  Then a user expect "error"