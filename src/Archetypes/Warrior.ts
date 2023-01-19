import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Warrior extends Archetype {
  private _energyType: EnergyType;
  private static _warriorCounter = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';
    Warrior._warriorCounter += 1;
  }

  public get energyType(): EnergyType {
    return this._energyType;
  }

  public static createdArchetypeInstances(): number {
    return this._warriorCounter;
  }
}