const app = angular.module('hamhero_app', []);
app.controller('mainController', ['$http', function($http) {
    this.URL = 'https://git.heroku.com/hamsterheroes.git';
    this.hamsters = [];
    this.newHamster = {};
    this.user = {};
    // this.registerForm = false;
    // this.loginForm = false;
    // this.deleteUserButton = false;
    const controller = this;
    const edit_form = false;

    this.login = function(userLogin) {
      this.userLogin = userLogin;
      console.log("User Logging in", userLogin);
      $http({
          method: 'POST',
          url: this.URL + '/users/login',
          data: { username: userLogin.username, password: userLogin.password }
        }).then(function(response) {
          console.log(response);
          this.user = response.data.user;
          localStorage.setItem('token', JSON.stringify(response.data.token));
          // this.getHamsters();
        }.bind(this));
    }
    //Allows an unregistered user to register
    this.register = function(userRegister) {
      console.log("User registering");
      this.userRegister = userRegister;
      $http({
          method: 'POST',
          url: this.URL + '/users',
          data: { username: userRegister.username, password: userRegister.password }
        }).then(function(response) {
          console.log(response);
          this.user = response.data.user;
          localStorage.setItem('token', JSON.stringify(response.data.token));
        }.bind(this));
    }
    //Logout current user and delete JWT Token
    this.logout = function() {
      localStorage.clear('token');
      location.reload();
    }
    this.getHamsters = function (){
      console.log("getting list of hampsters");
      $http({
        method: 'GET',
        url: this.URL + "/users/" + this.user.id + '/hamsters',
        headers: {
          Authorization: 'Bearer' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(result) {
          console.log('hamsters from api: ', result);
          if(result.data.status == 401){
            this.error = 'Unauthorized';
          }else {
          this.hamsters = result.data;
          console.log('result data', result.data);
          }
      }.bind(this), function(error) {
          console.log(error);
      });
    }
    this.createHamster = () => {
      console.log('Creating new hamster', this.newHamster);
      $http({
        method: 'POST',
        url: this.URL + "/users/" + this.user.id + '/hamsters',
        data: this.newHamster,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response){
        console.log("new hamster response", response);
        this.hamsters.unshift(response.data);
      }.bind(this), function(error) {
        console.log(error);
    });

    }

    this.deleteHamster = function(hamster){
      console.log('deleting hamster id', hamster.id);
      $http({
        method: 'DELETE',
        url: this.URL + '/users/' + this.user.id + '/hamsters/' + hamster.id,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(
        function(response){
          controller.getHamsters();
        },
        function (){
        }
      );
    }
    this.editHamster = function (ham) {
      console.log('Edit hamster called!');
      console.log('hamster id ', ham);
      $http({
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
        data: {hamster: {name: ham.name, color: ham.color, victory_points: ham.victory_points}},
        url: this.URL + '/users/' + this.user.id + '/hamsters/' + ham.id
      }).then(function(response){
          console.log("Edit hamster response data", response.data)
          controller.ham = response.data;
        }, function(error) {
            console.log("getting error instead of update", error);
        });
      // hide the form
      // controller.edit_form = false;
    };
    this.showHamsterOwner = function (user_id) {
        console.log("showHamsterOwner clicked for user ", user_id);
        $http({
          method: 'GET',
          url: this.URL + '/hamsters/' + user_id,
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
          }
        }).then(function(response){
            console.log(response.data)
            this.hamsters = response.data;
          }.bind(this), function(error) {
              console.log(error);
          });
    };
  }]);
