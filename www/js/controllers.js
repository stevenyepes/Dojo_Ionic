angular.module('app.controllers',[])

.controller('RedditCtrl', ['$scope','$http', function($scope, $http){

	$scope.posts = [];

	$http.get('https://www.reddit.com/r/gaming/new/.json').success(function(posts){
		
		angular.forEach(posts.data.children, function(post){

			$scope.posts.push(post.data);
			
		});

	});

	 $scope.loadMorePost = function() {
          var params = {};
          if($scope.posts.length > 0) {

            params['after'] = $scope.posts[$scope.posts.length - 1].name;
            console.log(params);
          }


           $http.get('https://www.reddit.com/r/movies/new/.json',{params:params}).success(function(posts){
            //console.log(posts);

            angular.forEach(posts.data.children, function(post){

              $scope.posts.push(post.data);
              
            });

            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      };
		
}]);
