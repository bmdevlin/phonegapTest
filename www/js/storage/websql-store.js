var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("EmployeeDB", "1.0", "Employee Demo DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS employee');
        var sql = "CREATE TABLE IF NOT EXISTS employee ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "firstName VARCHAR(50), " +
            "lastName VARCHAR(50), " +
            "title VARCHAR(50), " +
            "managerId INTEGER, " +
            "city VARCHAR(50), " +
            "officePhone VARCHAR(50), " +
            "cellPhone VARCHAR(50), " +
            "email VARCHAR(50))";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx, employees) {
        var employees = [
            {"id": 1, "firstName": "Thomas", "lastName": " ", "title":"Peeka-Poma-Poo ", "managerId": 0, "city":" ", "cellPhone":"Tennis ball", "officePhone":"To act like a human", "email":"Seven years old"},
            {"id": 2, "firstName": "Tanq", "lastName": " ", "title":"Pomaranian ", "managerId": 0, "city":" ", "cellPhone":"Tennis balls", "officePhone":"Tennis balls", "email":"Seven years old"},
            {"id": 3, "firstName": "Bailey", "lastName": " ", "title":"American Labrador Retriever ", "managerId": 0, "city":" ", "cellPhone":"Frisbee", "officePhone":"Morning Snuggles", "email":"Seven years old"},
            {"id": 4, "firstName": "Soju", "lastName": " ", "title":"Shih Tzu Poodle ", "managerId": 0, "city":" ", "cellPhone":"Fluffy doll", "officePhone":"Soju loves girls...", "email":"Four years old"},
            {"id": 5, "firstName": "Clancy", "lastName": " ", "title":"Havanese ", "managerId": 0, "city":" ", "cellPhone":"Squeaks", "officePhone":"All things chicken", "email":"One year old"}

            ];
        var l = employees.length;
        var sql = "INSERT OR REPLACE INTO employee " +
            "(id, firstName, lastName, managerId, title, city, officePhone, cellPhone, email) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = employees[i];
            tx.executeSql(sql, [e.id, e.firstName, e.lastName, e.managerId, e.title, e.city, e.officePhone, e.cellPhone, e.email],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.findByName = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " +
                    "FROM employee e LEFT JOIN employee r ON r.managerId = e.id " +
                    "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        employees = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        employees[i] = results.rows.item(i);
                    }
                    callback(employees);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.managerId, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
                    "FROM employee e " +
                    "LEFT JOIN employee r ON r.managerId = e.id " +
                    "LEFT JOIN employee m ON e.managerId = m.id " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

}
