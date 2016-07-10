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
          scope.wordsPerDay = (story.storyInfo.word_goal - scope.latestTotal) / parseInt(scope.daysLeft);
          scope.writingStreak;

          console.log(story.storyProgress);

          var makingStreak = true;
          var index = story.storyProgress.length - 1;
          // set date in streak to current date
          // while looping the date will be set to the last date of writing
          var lastDateInStreak = (moment().get('date') - 1);
          scope.writingStreak = 0;

          while (makingStreak) {
            var dateInLoop = moment(story.storyProgress[index].date_saved).get('date');

            console.log(dateInLoop);
            console.log(lastDateInStreak);

            // see if date in progress array is
            if (dateInLoop >=  lastDateInStreak) {
              lastDateInStreak = dateInLoop - 1;
              scope.writingStreak += 1;
              index--;
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
            var obj = {};
            for (var i = 0; i < story.storyProgress.length; i++) {
              var x = moment(story.storyProgress[i].date_saved).get('date');
              var y = story.storyProgress[i].word_total;
              obj[x] = y;
            }

            var dataPoints = [];
            var lastTotal = 0;

            for (var i = 1; i <= moment().get('date'); i++) {
              if (obj.hasOwnProperty(i)) {
                lastTotal = obj[i];
                dataPoints.push(lastTotal);
              }
              else {
                dataPoints.push(lastTotal);
              }
            }

            return [dataPoints];
          }

          for (var i = 1; i <= interval; i++) {
            chartMonth.push(i.toString());
          }

        }
      }
    }

})()
