var LocalStorageStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var employees = JSON.parse(window.localStorage.getItem("employees"));
        var results = employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, results);
    }

    this.findById = function(id, callback) {
        var employees = JSON.parse(window.localStorage.getItem("employees"));
        var employee = null;
        var l = employees.length;
        for (var i=0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }
        callLater(callback, employee);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    var employees = [
            {"id": 1, "firstName": "Thomas", "lastName": " ", "title":"Peeka-Poma-Poo ", "managerId": 0, "city":" ", "cellPhone":"Tennis ball", "officePhone":"To act like a human", "email":"Seven years old"},
            {"id": 2, "firstName": "Tanq", "lastName": " ", "title":"Pomaranian ", "managerId": 0, "city":" ", "cellPhone":"Tennis balls", "officePhone":"Tennis balls", "email":"Seven years old"},
            {"id": 3, "firstName": "Clancy", "lastName": " ", "title":"Havanese ", "managerId": 0, "city":" ", "cellPhone":"Squeaks", "officePhone":"All things chicken", "email":"One year old"}

        ];

    window.localStorage.setItem("employees", JSON.stringify(employees));

    callLater(successCallback);

}
