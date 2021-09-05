describe("Expense tracker app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Can add a positive transaction", () => {
    const transactionTitle = "Salary";
    const transactionValue = 300;

    cy.findByRole("textbox").type(transactionTitle);
    cy.findByRole("spinbutton").type(`{backspace}${transactionValue}{enter}`);

    cy.get(".list li").should("have.length", 1); // tener 1 todo
    cy.get(".list li")
      .first()
      .should("have.text", `${transactionTitle}+$${transactionValue}x`);
    cy.findByRole("heading", { name: /300\.00/i }).should("have.text", "300.00");
  });

  it("Can add a negative transaction", () => {
    const transactionTitle = "Breakfast";
    const transactionValue = 300;

    cy.findByRole("textbox").type(transactionTitle);
    cy.findByRole("spinbutton").type(`{backspace}-${transactionValue}{enter}`);

    cy.get(".list li").should("have.length", 1); // tener 2 todo
    cy.get(".list li")
      .first()
      .should("have.text", `${transactionTitle}-$${transactionValue}x`);
    cy.findByRole("heading", { name: /300\.00/i }).should("have.text", "-300.00");
  });
});
