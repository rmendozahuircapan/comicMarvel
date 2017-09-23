(function(){
  var app = angular.module('starter', ['ionic'])
  var comics = [];
  
  function getComic(id){
    return comics.filter(function(comic){
      return comic.id == id;
    })[0];
  }
  
  app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('list',{
      url: '/list',
      templateUrl: 'templates/list.html'
    });
    $stateProvider.state('detail',{
      url: '/detail/:id',
      templateUrl: 'templates/detail.html'
    });
    $urlRouterProvider.otherwise('/list');
  })
  
  app.controller('MarvelCtrl',function($scope,$http){
    $scope.comics = [];
    $http.get('http://gateway.marvel.com/v1/public/comics?ts=1&apikey=e5bd84c9380ca1e45730934dcbaf2bdb&hash=b983eec0e264f8544553c9a58cb42d43')
          .success(function(comics){
            angular.forEach(comics.data.results,function(comic){
              $scope.comics.push(comic);
            })
          });
    comics = $scope.comics;
  });

  app.controller('DetailCtrl',function($scope,$state){
    $scope.id = $state.params.id;
    $scope.comic = getComic($scope.id);
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
}());