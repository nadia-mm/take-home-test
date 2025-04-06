export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

const updateNormalDrugBenefit = (drug) => {
  drug.benefit = drug.expiresIn < 0 ? Math.max(drug.benefit - 2, 0) : Math.max(drug.benefit - 1, 0);
}

const updateHerbalTeaBenefit = (drug) => {
  drug.benefit = drug.expiresIn < 0 ? Math.min(drug.benefit + 2, 50) : Math.min(drug.benefit + 1, 50);
}

const updateFervexBenefit = (drug) => {
  if (drug.expiresIn < 0) {
    drug.benefit = 0;
  } else if (drug.expiresIn < 5) {
    drug.benefit = Math.min(drug.benefit + 3, 50);
  } else if (drug.expiresIn < 10) {
    drug.benefit = Math.min(drug.benefit + 2, 50);
  } else {
    drug.benefit = Math.min(drug.benefit + 1, 50);
  }
}

const updateDafalganBenefit = (drug) => {
  drug.benefit = drug.expiresIn < 0 ? Math.max(drug.benefit - 4, 0) : Math.max(drug.benefit - 2, 0);
}

const checkMagicPillBenefit = (drug) => {
  drug.benefit = drug.benefit < 0 ? 0 : Math.min(drug.benefit, 50);
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }


  updateBenefitValue() {

    for (var i = 0; i < this.drugs.length; i++) {

      if (this.drugs[i].name !== "Magic Pill") {
        this.drugs[i].expiresIn -= 1;
        if (this.drugs[i].name === "Herbal Tea") {
          updateHerbalTeaBenefit(this.drugs[i])
        }
        else if (this.drugs[i].name === "Fervex") {
          updateFervexBenefit(this.drugs[i])
        }
        else if (this.drugs[i].name === "Dafalgan") {
          updateDafalganBenefit(this.drugs[i])
        } else {
          updateNormalDrugBenefit(this.drugs[i])
        }
      } else {
        checkMagicPillBenefit(this.drugs[i]);
      }

    }
    return this.drugs;

  }
}
