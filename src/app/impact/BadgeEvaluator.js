import Badge from './Badge';

/*
 * The Badge Evaluator
 * Runs when the user opens the Impact Page and evaluates if any of
 * the user's recent activity has earned them any new badges.
 * If it has, a modal will be opened to tell them they have earned new badges.
 * @author Jade Carino
 */
class BadgeEvaluator {
  constructor(allBadges, usersBadges, userStats) {
    this.allBadges = allBadges;
    this.usersBadges = usersBadges;
    this.userStats = userStats;
  }

  evaluateNewBadges() {
    const newBadgesToGrant = this.allBadges?.map((badge) => {
      console.log(
        'Assessing user against badge criteria for badge ID ' + badge.id,
      );

      // Check the user doesn't already have this badge...
      if (!this.usersBadges.includes(badge.id)) {
        // Call the deserialized function stored with the badge to see if user meets criteria...
        let func = new Function(
          'userStats',
          `return (${badge.criteria.serializedFunction})`,
        );
        let userMeetsCriteria = func(this.userStats);

        if (userMeetsCriteria) {
          console.log('This user has now achieved badge ' + badge.id);
          let badgeInfo = {
            id: badge.id,
            name: badge.name,
            desc: badge.description,
          };
          return badgeInfo;
        } else {
          console.log(
            'This user does not meet the criteria for the badge ' + badge.id,
          );
        }
      } else {
        console.log('This user already has badge ' + badge.id);
      }
    });

    let filteredNewBadgesToGrant = [];
    if (newBadgesToGrant != undefined && newBadgesToGrant.length > 0) {
      filteredNewBadgesToGrant = newBadgesToGrant?.filter((badge) => badge);
    }

    return filteredNewBadgesToGrant;
  }

  renderNewBadgeComponents(newBadgesEarned) {
    let badges = newBadgesEarned?.map((badgeInfo) => {
      return (
        <Badge
          key={badgeInfo?.id}
          name={badgeInfo?.name}
          desc={badgeInfo?.desc}
        ></Badge>
      );
    });
    return badges;
  }
}

module.exports = BadgeEvaluator;
