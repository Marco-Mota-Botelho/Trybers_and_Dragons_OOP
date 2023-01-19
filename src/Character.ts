import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private readonly _energy: Energy;
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(this._name, this._dexterity);
    this._archetype = new Mage(this._name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { type_: this._archetype.energyType,
      amount: getRandomInt(1, 10) }; 
  }

  get race() {
    return this._race;
  }

  get archetype() {
    return this._archetype;
  }

  get dexterity() {
    return this._dexterity;
  }

  get lifePoints() {
    return this._lifePoints;
  }

  get strength() {
    return this._strength;
  }

  get defense() {
    return this._defense;
  }

  get energy() {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  receiveDamage(attackPoints: number) {
    const damage = attackPoints - this._defense;

    if (damage > 0) {
      this._lifePoints = this.lifePoints - damage;
    } else {
      this._lifePoints -= 1;
    }

    if (this._lifePoints > 0) {
      return this.lifePoints;
    } 
    this._lifePoints = -1;
    return this.lifePoints;
  }

  attack(enemy: Fighter) {
    enemy.receiveDamage(this._strength);
  }

  levelUp() {
    const newMaxLife = getRandomInt(1, 10) + this._maxLifePoints;
  
    if (newMaxLife > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    } else {
      this._maxLifePoints = newMaxLife;
    }
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);

    this._energy.amount = 10;
    this._lifePoints = this._maxLifePoints;
  }

  special() {
    const specialCost = 3;
    if ((this._energy.amount - specialCost) >= 0) {
      if ((this._lifePoints + (specialCost * this._strength)
      <= this._maxLifePoints)) {
        this._lifePoints += (specialCost * this._strength);
      } else {
        this._lifePoints = this._maxLifePoints;
      }
    }
  }
}