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
          storyInfo: '=storyInfo',
          storyProgress: '=storyProgress'
        },
        link: function (scope, element, attrs) {
          const story = scope.storyInfo;
          console.log(story);

          // maps x axis points based on days in month
          var chartMonth = [];
          var interval = moment.duration(moment(story.deadlineEnds) - moment(story.deadlineStarts)).days();

          for (var i = 1; i <= interval; i++) {
            chartMonth.push(i.toString());
          }
          var makePoints = function(progress) {
            var obj = {};
            for (var i = 0; i < scope.storyProgress.length; i++) {
              var x = moment(scope.storyProgress[i].date_saved).get('date');
              var y = scope.storyProgress[i].word_total;
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



          scope.points = makePoints(scope.storyProgress);
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
