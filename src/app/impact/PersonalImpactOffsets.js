/**
 * Personal Impact Offsets to show the EcoHive users the impact they are making on the environment.
 * 10 EcoHive points achieved = 1kg of Carbon emissions.
 * This will show users how much Carbon emissions their eco-friendly activites have helped to offset.
 * @author Jade Carino
 */
class PersonalImpactOffsets {
  constructor(points) {
    this.points = points;
  }

  get() {
    for (let i = 0; i < offsets.length; i++) {
      if (i == offsets.length - 1) {
        return offsets[i].offset;
      }
      if (
        offsets[i].points <= this.points &&
        this.points < offsets[i + 1].points
      ) {
        return offsets[i].offset;
      }
    }
  }
}

const offsets = [
  {
    points: 0,
    offset: 'nothing yet...',
  },
  {
    points: 1000,
    offset:
      'the electricity consumption to boil a kettle several times a day for about a month!',
  },
  {
    points: 2000,
    offset:
      'the driving emissions from driving a small car for approximately 500 miles!',
  },
  {
    points: 3000,
    offset:
      'the energy to heat a small room with an electric heater for a winter season!',
  },
  {
    points: 4000,
    offset:
      'the emissions from a short domestic flight of approximately 300 miles!',
  },
  {
    points: 5000,
    offset: 'the energy to produce the aluminum needed for about 500 cans!',
  },
  {
    points: 6000,
    offset:
      'the driving emissions from a mid-size sedan for commuting to work for about one month!',
  },
  {
    points: 7000,
    offset:
      'the energy to heat water for showers and washing dishes for a household for approximately two weeks!',
  },
  {
    points: 8000,
    offset:
      'a train journey for a long-distance trip of approximately 500 miles!',
  },
  {
    points: 9000,
    offset:
      'the energy to produce the plastic needed for a set of about 1000 plastic bottles!',
  },
  {
    points: 10000,
    offset:
      'the electricity generated from natural gas for a household for about one month!',
  },
];

export default PersonalImpactOffsets;
