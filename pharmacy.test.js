import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease by 1 the benefit and expiresIn of a normal drug before expiration", () => {
    expect(new Pharmacy([new Drug('Doliprane', 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug('Doliprane', 1, 2)],
    );
  });
  it('should degrade the benefit of a normal drug twice as fast after expiration', () => {
    expect(
      new Pharmacy([new Drug('Doliprane', 0, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Doliprane', -1, 8)]);
  });
  it('should never allow the benefit of any drug to go below 0', () => {
    expect(
      new Pharmacy([new Drug('Doliprane', 0, 1)]).updateBenefitValue()
    ).toEqual([new Drug('Doliprane', -1, 0)]);
    expect(
      new Pharmacy([new Drug('Doliprane', 0, 0)]).updateBenefitValue()
    ).toEqual([new Drug('Doliprane', -1, 0)]);

    expect(
      new Pharmacy([new Drug('Herbal Tea', 0, 1)]).updateBenefitValue()
    ).not.toEqual([new Drug('Herbal Tea', -1, 0)]);
    expect(
      new Pharmacy([new Drug('Herbal Tea', 0, 0)]).updateBenefitValue()
    ).not.toEqual([new Drug('Herbal Tea', -1, 0)]);

    expect(
      new Pharmacy([new Drug('Fervex', 0, 1)]).updateBenefitValue()
    ).toEqual([new Drug('Fervex', -1, 0)]);
    expect(
      new Pharmacy([new Drug('Fervex', 0, 0)]).updateBenefitValue()
    ).toEqual([new Drug('Fervex', -1, 0)]);

    expect(
      new Pharmacy([new Drug('Dafalgan', 0, 1)]).updateBenefitValue()
    ).toEqual([new Drug('Dafalgan', -1, 0)]);
    expect(
      new Pharmacy([new Drug('Dafalgan', 0, 0)]).updateBenefitValue()
    ).toEqual([new Drug('Dafalgan', -1, 0)]);
    expect(
      new Pharmacy([new Drug('Magic Pill', 5, -5)]).updateBenefitValue()
    ).toEqual([new Drug('Magic Pill', 5, 0)]);
    expect(
      new Pharmacy([new Drug('Magic Pill', 5, 0)]).updateBenefitValue()
    ).toEqual([new Drug('Magic Pill', 5, 0)]);
  });

  it('should increase the benefit of Herbal Tea by 1 before expiration and by 2 after expiration', () => {
    expect(
      new Pharmacy([new Drug('Herbal Tea', 5, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Herbal Tea', 4, 11)]);

    expect(
      new Pharmacy([new Drug('Herbal Tea', 0, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Herbal Tea', -1, 12)]);
  });

  it('should never allow the benefit of any drug to exceed 50', () => {
    expect(
      new Pharmacy([new Drug('Doliprane', 5, 49)]).updateBenefitValue().at(0).benefit
    ).not.toEqual([new Drug('Doliprane', 4, 50)]);
    expect(
      new Pharmacy([new Drug('Doliprane', 0, 50)]).updateBenefitValue()
    ).not.toEqual([new Drug('Doliprane', -1, 50)]);

    expect(
      new Pharmacy([new Drug('Herbal Tea', 5, 49)]).updateBenefitValue()
    ).toEqual([new Drug('Herbal Tea', 4, 50)]);
    expect(
      new Pharmacy([new Drug('Herbal Tea', 0, 50)]).updateBenefitValue()
    ).toEqual([new Drug('Herbal Tea', -1, 50)]);

    expect(
      new Pharmacy([new Drug('Fervex', 13, 49)]).updateBenefitValue()
    ).toEqual([new Drug('Fervex', 12, 50)]);
    expect(
      new Pharmacy([new Drug('Fervex', 13, 50)]).updateBenefitValue()
    ).toEqual([new Drug('Fervex', 12, 50)]);

    expect(
      new Pharmacy([new Drug('Dafalgan', 5, 49)]).updateBenefitValue()
    ).not.toEqual([new Drug('Dafalgan', 4, 50)]);
    expect(
      new Pharmacy([new Drug('Dafalgan', 0, 50)]).updateBenefitValue()
    ).not.toEqual([new Drug('Dafalgan', -1, 50)]);
    expect(
      new Pharmacy([new Drug('Magic Pill', 5, 60)]).updateBenefitValue()
    ).toEqual([new Drug('Magic Pill', 5, 50)]);
    expect(
      new Pharmacy([new Drug('Magic Pill', 5, 50)]).updateBenefitValue()
    ).toEqual([new Drug('Magic Pill', 5, 50)]);
  });

  it('should not change the benefit or expiration of Magic Pill', () => {
    expect(
      new Pharmacy([new Drug('Magic Pill', 5, 40)]).updateBenefitValue()
    ).toEqual([new Drug('Magic Pill', 5, 40)]);
  });

  it('should increase the benefit of Fervex based on its expiration date and drop to 0 after expiration', () => {
    expect(
      new Pharmacy([new Drug('Fervex', 15, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Fervex', 14, 11)]);

    expect(
      new Pharmacy([new Drug('Fervex', 8, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Fervex', 7, 12)]);

    expect(
      new Pharmacy([new Drug('Fervex', 3, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Fervex', 2, 13)]);

    expect(
      new Pharmacy([new Drug('Fervex', 0, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Fervex', -1, 0)]);
  });

  it('should degrade the benefit of Dafalgan twice as fast as a normal drug before expiration', () => {
    expect(
      new Pharmacy([new Drug('Dafalgan', 2, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Dafalgan', 1, 8)]);
  });

  it('should degrade the benefit of Dafalgan twice as fast as a normal drug after expiration', () => {
    expect(
      new Pharmacy([new Drug('Dafalgan', 0, 10)]).updateBenefitValue()
    ).toEqual([new Drug('Dafalgan', -1, 6)]);
  });
});
