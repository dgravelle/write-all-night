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
          debugger;
          const story = scope.story;
          scope.latestTotal = story.storyProgress[story.storyProgress.length -1].word_total;
          console.log(story);

          // maps x axis points based on days in month
          var chartMonth = [];

          var interval = moment.duration(moment(story.storyInfo.deadlineEnds) - moment(story.storyInfo.deadlineStarts)).days();

          for (var i = 1; i <= interval; i++) {
            chartMonth.push(i.toString());
          }

          var makePoints = function(progress) {
            var obj = {};
            for (var i = 0; i < story.storyProgress.length; i++) {
              var x = moment(story.storyProgress[i].date_saved).get('date');
              var y = story.storyProgress[i].word_total;
              obj[x] = y;
            }

            console.log(obj);

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

          scope.points = makePoints(story.storyProgress);
          console.log(scope.points);
          scope.labels = chartMonth;
          scope.option = {
            scaleOverride: true,
            scaleSteps: 50000 / 10000,
            scaleStepWidth: Math.ceil(50000 / (50000 / 10000)),
            scaleStartValue: 0
          }
        }
      }
    }

})()
