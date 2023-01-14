"use strict";
var root = new Map();
var insert = function (supervisor, employee) {
    supervisor.subordinates.push(employee);
    // supervisor.subordinates.push(employee);
    if (root.has(supervisor.uniqueId)) {
        var rootValue = root.get(supervisor.uniqueId);
        rootValue === null || rootValue === void 0 ? void 0 : rootValue.push(employee);
        root.set(supervisor.uniqueId, rootValue || []);
    }
    else {
        root.set(supervisor.uniqueId, [employee]);
    }
    root.set(employee.uniqueId, []);
    return employee;
};
var CEO = {
    name: 'Mark',
    uniqueId: 1,
    subordinates: []
};
var CPO = insert(CEO, { name: 'Steve', uniqueId: 2, subordinates: [] });
var CFO = insert(CEO, { name: 'Clement', uniqueId: 3, subordinates: [] });
var CTO = insert(CEO, { name: 'Caleb', uniqueId: 4, subordinates: [] });
var MARKETTING_LEAD = insert(CPO, { name: 'Emmanuel', uniqueId: 5, subordinates: [] });
var SUPPORT_LEAD = insert(CPO, { name: 'Deji', uniqueId: 6, subordinates: [] });
var COMPLIANCE_LEAD = insert(CFO, { name: 'Tolu', uniqueId: 7, subordinates: [] });
var MOBILE_LEAD = insert(CTO, { name: 'Sayo', uniqueId: 8, subordinates: [] });
var BACK_LEAD = insert(CTO, { name: 'Dev', uniqueId: 9, subordinates: [] });
var FRONT_LEAD = insert(CTO, { name: "seyi", uniqueId: 10, subordinates: [] });
console.log({ root: root });
console.log({ CEO: CEO });
var EmployeeOrgApp = /** @class */ (function () {
    function EmployeeOrgApp(employee) {
        this.ceo = employee;
    }
    EmployeeOrgApp.prototype.move = function (employeeID, supervisorID) {
        var employeeSubordinates = root.get(employeeID);
        var supervisorSubordinates = root.get(supervisorID);
    };
    EmployeeOrgApp.prototype.undo = function () {
        throw new Error("Method not implemented.");
    };
    EmployeeOrgApp.prototype.redo = function () {
        throw new Error("Method not implemented.");
    };
    return EmployeeOrgApp;
}());
