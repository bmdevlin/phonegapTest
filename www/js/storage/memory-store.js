var MemoryStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var employees = this.employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, employees);
    }

    this.findById = function(id, callback) {
        var employees = this.employees;
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

    this.employees = [
        {"id": 1, "firstName": "Thomas", "lastName": " ", "title":"Peeka-Poma-Poo ", "managerId": 0, "city":" ", "cellPhone":"Tennis ball", "officePhone":"To act like a human", "email":"Seven years old"},
        {"id": 2, "firstName": "Tanq", "lastName": " ", "title":"Pomaranian ", "managerId": 0, "city":" ", "cellPhone":"Tennis balls", "officePhone":"Tennis balls", "email":"Seven years old"},
        {"id": 3, "firstName": "Bailey", "lastName": " ", "title":"American Labrador Retriever ", "managerId": 0, "city":" ", "cellPhone":"Frisbee", "officePhone":"Morning Snuggles", "email":"Seven years old"},
        {"id": 4, "firstName": "Soju", "lastName": " ", "title":"Shih Tzu Poodle ", "managerId": 0, "city":" ", "cellPhone":"Fluffy doll", "officePhone":"Soju loves girls...", "email":"Four years old"},
        {"id": 5, "firstName": "Clancy", "lastName": " ", "title":"Havanese ", "managerId": 0, "city":" ", "cellPhone":"Squeaks", "officePhone":"All things chicken", "email":"One year old"},
        {"id": 6, "firstName": "Bowser", "lastName": " ", "title":"Border Collie/Kelpie ", "managerId": 0, "city":" ", "cellPhone":"Ball", "officePhone":"Playing with his friends", "email":"Two years old"},
        {"id": 7, "firstName": "Mae", "lastName": " ", "title":"Golden Retriever and Bullmastiff ", "managerId": 0, "city":" ", "cellPhone":"Hide-a-squirrel", "officePhone":"All creatures big and small", "email":"One year old"},
        {"id": 8, "firstName": "Talula", "lastName": " ", "title":"Mixed ", "managerId": 0, "city":" ", "cellPhone":"Her peanut butter bone", "officePhone":"Tummy rubs", "email":"One year old"},
        {"id": 9, "firstName": "Lola", "lastName": " ", "title":"Bernese Mountain Dog", "managerId": 0, "city":" ", "cellPhone":"Her Moo Moo (cow)", "officePhone":"To shake your hand", "email":"Seven years old"},
        {"id": 10, "firstName": "Muffin", "lastName": " ", "title":"Tri-color Pembroke Welsh Corgi ", "managerId": 0, "city":" ", "cellPhone":"A stuffed sheep", "officePhone":"She loves people and playing fetch", "email":"One year old"}


        ];

    callLater(successCallback);

}
