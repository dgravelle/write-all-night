'use strict';

(function () {

  angular
    .module('app')
    .directive('storyChart', storyChart)

    function storyChart() {
      return {
        restrict: 'E',
        templateUrl: 'javascripts/directives/story-chart.html',
        scope: {
          story: '=story',
        },
        link: function (scope, element, attrs) {
          const story = scope.story;
          var chartMonth = [];
          var interval = moment.duration(
            moment(story.storyInfo.deadlineEnds) - moment(story.storyInfo.deadlineStarts)
          ).days();


          scope.latestTotal = story.storyProgress[story.storyProgress.length -1].word_total;
          scope.percentComplete = (scope.latestTotal / story.storyInfo.word_goal) * 100;

          scope.daysLeft = moment().to(story.storyInfo.deadlineEnds, true);

          scope.wordsPerDayLeft = (
            (story.storyInfo.word_goal - scope.latestTotal) / parseInt(scope.daysLeft)
          );

          scope.wordsPerDay = (
            story.storyProgress[story.storyProgress.length - 1 ].word_total /
            story.storyProgress.length
          )
          scope.writingStreak;

          var makingStreak = true;
          var index = story.storyProgress.length - 1;
          var lastDateInStreak = (moment().get('date') - 1);
          scope.writingStreak = 0;

          // debugger;
          while (makingStreak) {
            var dateInLoop = moment(story.storyProgress[index].date_saved).get('date');

            if (dateInLoop >=  lastDateInStreak) {
              lastDateInStreak = dateInLoop - 1;
              scope.writingStreak += 1;

              if (index <= 0) {
                makingStreak = false;
              }
              else {
                index--;
              }
            }
            else {
              makingStreak = false;
            }
          }

          scope.points = makePoints(story.storyProgress);
          scope.labels = chartMonth;
          scope.option = {
            scaleOverride: true,
            scaleSteps: 50000 / 10000,
            scaleStepWidth: Math.ceil(50000 / (50000 / 10000)),
            scaleStartValue: 0
          }

          function makePoints(progress) {

            // debugger;
            var obj = {};
            for (var i = 0; i < story.storyProgress.length; i++) {
              var x = moment(story.storyProgress[i].date_saved).get('date');
              var y = story.storyProgress[i].word_total;
              obj[x] = y;
            }

            var dataPoints = [];
            var lastTotal = 0;

            for (var j = 1; j <= story.storyProgress.length; j++) {
              if (obj.hasOwnProperty(j)) {
                lastTotal = obj[j];
                dataPoints.push(lastTotal);
              }
              else {
                dataPoints.push(lastTotal);
              }
            }

            var targetProgress = [];
            var avgWordsPerDay = story.storyInfo.word_goal / interval;
            var avgTotal = 0

            for (var k = interval; k > 0; k--) {
                targetProgress.push(avgTotal += avgWordsPerDay);
            }
            console.log(dataPoints);
            return [dataPoints, targetProgress ];
          }

          for (var i = 0; i <= interval; i++) {
            chartMonth.push(i.toString());
          }

        }
      }
    }

})()
