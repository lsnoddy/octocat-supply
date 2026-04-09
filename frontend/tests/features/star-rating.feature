Feature: Product star rating
  As a supply chain planner
  I want to rate products with stars directly on the product page
  So that I can record my satisfaction with each product

  Scenario: Star rating buttons are visible on product cards
    Given I am viewing the product catalog
    When the product grid has loaded
    Then each product card shows five red star buttons

  Scenario: Click a star to rate a product
    Given I am viewing the product catalog
    And the product grid has loaded
    When I click the 4th star button on the first product card
    Then the first four stars are highlighted in red
    And a confirmation message shows my rating

  Scenario: Rating persists after page reload
    Given I have rated the first product 3 stars
    When I reload the product catalog page
    Then the first three stars on that product remain highlighted in red

  Scenario: Star rating is also available in the product detail modal
    Given I am viewing the product catalog
    And the product grid has loaded
    When I open the detail modal for the first product
    Then the modal shows five red star rating buttons
