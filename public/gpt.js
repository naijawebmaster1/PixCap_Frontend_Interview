"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var EmployeeOrgAppV2 = /** @class */ (function () {
    function EmployeeOrgAppV2(ceo) {
        this.undoStack = [];
        this.redoStack = [];
        this.ceo = ceo;
    }
    EmployeeOrgAppV2.prototype.move = function (employeeID, supervisorID) {
        var employee = this.findEmployee(employeeID, this.ceo);
        var supervisor = this.findEmployee(supervisorID, this.ceo);
        if (!employee || !supervisor) {
            console.log("Employee or Supervisor not found");
            return;
        }
        var oldSupervisor = this.findSupervisor(employee, this.ceo);
        this.removeFromSubordinates(employee, oldSupervisor);
        this.addToSubordinates(employee, supervisor);
        this.undoStack.push({ employee: employee, oldSupervisor: oldSupervisor, newSupervisor: supervisor });
    };
    EmployeeOrgAppV2.prototype.undo = function () {
        var lastMove = this.undoStack.pop();
        if (!lastMove) {
            console.log("No more moves to undo");
            return;
        }
        this.removeFromSubordinates(lastMove.employee, lastMove.newSupervisor);
        this.addToSubordinates(lastMove.employee, lastMove.oldSupervisor);
        this.redoStack.push(lastMove);
    };
    EmployeeOrgAppV2.prototype.redo = function () {
        var lastUndo = this.redoStack.pop();
        if (!lastUndo) {
            console.log("No more moves to redo");
            return;
        }
        this.removeFromSubordinates(lastUndo.employee, lastUndo.oldSupervisor);
        this.addToSubordinates(lastUndo.employee, lastUndo.newSupervisor);
        this.undoStack.push(lastUndo);
    };
    EmployeeOrgAppV2.prototype.findEmployee = function (employeeID, employee) {
        if (employee.uniqueId === employeeID) {
            return employee;
        }
        for (var _i = 0, _a = employee.subordinates; _i < _a.length; _i++) {
            var subordinate = _a[_i];
            var found = this.findEmployee(employeeID, subordinate);
            if (found) {
                return found;
            }
        }
        return null;
    };
    EmployeeOrgAppV2.prototype.findSupervisor = function (employee, supervisor) {
        if (supervisor.subordinates.includes(employee)) {
            return supervisor;
        }
        for (var _i = 0, _a = supervisor.subordinates; _i < _a.length; _i++) {
            var subordinate = _a[_i];
            var found = this.findSupervisor(employee, subordinate);
            if (found) {
                return found;
            }
        }
        return supervisor;
    };
    EmployeeOrgAppV2.prototype.removeFromSubordinates = function (employee, supervisor) {
        var index = supervisor.subordinates.indexOf(employee);
        if (index !== -1) {
            supervisor.subordinates.splice(index, 1);
        }
    };
    EmployeeOrgAppV2.prototype.addToSubordinates = function (employee, supervisor) {
        supervisor.subordinates.push(employee);
    };
    return EmployeeOrgAppV2;
}());
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var test, ceopString, parsedCEO;
        return __generator(this, function (_a) {
            test = new EmployeeOrgAppV2(CEO);
            ceopString = JSON.stringify(test.ceo);
            parsedCEO = JSON.parse(ceopString);
            console.log({ ceo: parsedCEO }, "Initial Object");
            test.move(10, 2);
            ceopString = JSON.stringify(test.ceo);
            parsedCEO = JSON.parse(ceopString);
            // console.log({ ceo: JSON.stringify(test.ceo) }, "After using move operation")
            console.log({ ceo: parsedCEO }, "After using move operation");
            test.undo();
            ceopString = JSON.stringify(test.ceo);
            parsedCEO = JSON.parse(ceopString);
            // console.log({ ceo: JSON.stringify(test.ceo) }, "After using move operation")
            console.log({ ceo: parsedCEO }, "After using undo operation");
            test.redo();
            ceopString = JSON.stringify(test.ceo);
            parsedCEO = JSON.parse(ceopString);
            // console.log({ ceo: JSON.stringify(test.ceo) }, "After using move operation")
            console.log({ ceo: parsedCEO }, "After using redo operation");
            return [2 /*return*/];
        });
    });
}
main();
