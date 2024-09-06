Feature: see and filter all books

Scenario: bookAdmin see all books
  Given a bookAdmin is logged in with ID 27
  When the bookAdmin tries to see all books
  Then a bookAdmin expect "success" 

Scenario: Non-bookAdmin tries to see all books
  Given a Non-bookAdmin is logged in with ID 28
  When the Non-bookAdmin tries to see all books
  Then a Non-bookAdmin expect "error"