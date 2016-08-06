(function () {

  angular
    .module('app')
    .service('ProgressService', ProgressService);


    function ProgressService($http) {
      return {
        getStoryProgress: function(userId) {
          return $http.get('/progress/' + userId).then(data => {
            var report = data.data;
            var progress = report.progress;
            var info = report.info;
            var start = moment(info.deadlineStarts);
            var end = moment(info.deadlineEnds);
            var interval = end.diff(start,'days');
            // debugger;
            var progressPoints = this.makeProgressPoints(progress, interval, start);
            var projectedPoints = this.makeProjectedPoints(info, interval);

            report.writingStreak = this.writingStreak(progress);
            report.mapPoints = [projectedPoints,progressPoints];

            report.latestTotal =  progress[progress.length -1].word_total;

            report.percentComplete = (report.latestTotal / info.word_goal) * 100;

            report.daysLeft = end.diff(moment(), 'days');

            if (report.daysLeft < 0) {
              report.daysLeft = 0;
            }
            
            report.wordsPerDayLeft = Math.round((info.word_goal - report.latestTotal) / interval);

            report.wordsPerDay = (
              progress[progress.length - 1].word_total /
              progress.length
            )

            report.labels = this.makeMapLabels(info, interval)

            return report;
          })
          .catch(err => {
            console.error(err);
          })
        },

        makeMapLabels: function(storyInfo, interval) {
          var labels = [];


          for (var i = 0; i <= interval; i++) {
            labels.push(i.toString());
          }
          return labels;
        },

        makeProjectedPoints: function(storyInfo, interval) {
          var targetProgress = [0];

          var avgWordsPerDay = storyInfo.word_goal / interval;
          var avgTotal = 0

          for (var k = interval; k > 0; k--) {
              targetProgress.push(avgTotal += avgWordsPerDay);
          }
          return targetProgress;
        },

        makeProgressPoints: function(prog, interval, start) {
          var obj = {};

          for (var i = 0; i < prog.length; i++) {
            var x = moment(prog[i].date_saved).diff(start, 'days');
            var y = prog[i].word_total;
            obj[x] = y;
          }

          var dataPoints = [0];
          var lastTotal = 0;
          var projectLength = moment().diff(start, 'days');

          if (projectLength < 1) {
            projectLength = 1
          }


          for (var j = 0; j < projectLength; j++) {
            if (obj.hasOwnProperty(j)) {
              lastTotal = obj[j];
            }
            dataPoints.push(lastTotal);
          }
          return dataPoints;
        },

        writingStreak: function(progress) {
          var writingStreak = 0;
          var lastDateInStreak = (moment().get('date') - 1);
          var index = progress.length - 1;
          var makingStreak = true;

          while(makingStreak) {
            var dateInLoop = moment(progress[index].date_saved).get('date');

            if (dateInLoop >=  lastDateInStreak) {
              lastDateInStreak = dateInLoop - 1;
              writingStreak += 1;

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
          return writingStreak;
        }
      }
    }

})()
