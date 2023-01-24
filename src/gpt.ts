interface Employee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
}

interface IEmployeeOrgApp {
    ceo: Employee;
    move(employeeID: number, supervisorID: number): void;
    undo(): void;
    redo(): void;
}

class EmployeeOrgAppV2 implements IEmployeeOrgApp {
    ceo: Employee;
    private undoStack: Array<{ employee: Employee, oldSupervisor: Employee, newSupervisor: Employee }> = [];
    private redoStack: Array<{ employee: Employee, oldSupervisor: Employee, newSupervisor: Employee }> = [];

    constructor(ceo: Employee) {
        this.ceo = ceo;
    }

    move(employeeID: number, supervisorID: number): void {
        const employee = this.findEmployee(employeeID, this.ceo);
        const supervisor = this.findEmployee(supervisorID, this.ceo);
        if (!employee || !supervisor) {
            console.log("Employee or Supervisor not found");
            return;
        }
        const oldSupervisor = this.findSupervisor(employee, this.ceo);
        this.removeFromSubordinates(employee, oldSupervisor);
        this.addToSubordinates(employee, supervisor);
        this.undoStack.push({ employee, oldSupervisor, newSupervisor: supervisor });
    }
    undo(): void {
        const lastMove = this.undoStack.pop();
        if (!lastMove) {
            console.log("No more moves to undo");
            return;
        }
        this.removeFromSubordinates(lastMove.employee, lastMove.newSupervisor);
        this.addToSubordinates(lastMove.employee, lastMove.oldSupervisor);
        this.redoStack.push(lastMove);
    }
    redo(): void {
        const lastUndo = this.redoStack.pop();
        if (!lastUndo) {
            console.log("No more moves to redo");
            return;
        }
        this.removeFromSubordinates(lastUndo.employee, lastUndo.oldSupervisor);
        this.addToSubordinates(lastUndo.employee, lastUndo.newSupervisor);
        this.undoStack.push(lastUndo);
    }

    private findEmployee(employeeID: number, employee: Employee): Employee | null {
        if (employee.uniqueId === employeeID) {
            return employee;
        }
        for (const subordinate of employee.subordinates) {
            const found = this.findEmployee(employeeID, subordinate);
            if (found) {
                return found;
            }
        }
        return null;
    }
    private findSupervisor(employee: Employee, supervisor: Employee): Employee {
        if (supervisor.subordinates.includes(employee)) {
            return supervisor;
        }
        for (const subordinate of supervisor.subordinates) {
            const found = this.findSupervisor(employee, subordinate);
            if (found) {
                return found;
            }
        }
        return supervisor;
    }
    private removeFromSubordinates(employee: Employee, supervisor: Employee) {
        const index = supervisor.subordinates.indexOf(employee);
        if (index !== -1) {
            supervisor.subordinates.splice(index, 1);
        }
    }
    private addToSubordinates(employee: Employee, supervisor: Employee) {
        supervisor.subordinates.push(employee);
    }
}

const root = new Map() as Map<number, Employee[]>

const insert = (supervisor: Employee, employee: Employee) => {
    supervisor.subordinates.push(employee);
    // supervisor.subordinates.push(employee);
    if (root.has(supervisor.uniqueId)) {
        const rootValue = root.get(supervisor.uniqueId);
        rootValue?.push(employee);
        root.set(supervisor.uniqueId, rootValue || []);
    }
    else {
        root.set(supervisor.uniqueId, [employee]);
    }
    root.set(employee.uniqueId, []);
    return employee;
}


const CEO: Employee = {
    name: 'Mark',
    uniqueId: 1,
    subordinates: [

    ]
}


const CPO = insert(CEO, { name: 'Steve', uniqueId: 2, subordinates: [] })

const CFO = insert(CEO, { name: 'Clement', uniqueId: 3, subordinates: [] });

const CTO = insert(CEO, { name: 'Caleb', uniqueId: 4, subordinates: [] });

const MARKETTING_LEAD = insert(CPO, { name: 'Emmanuel', uniqueId: 5, subordinates: [] });

const SUPPORT_LEAD = insert(CPO, { name: 'Deji', uniqueId: 6, subordinates: [] })

const COMPLIANCE_LEAD = insert(CFO, { name: 'Tolu', uniqueId: 7, subordinates: [] })

const MOBILE_LEAD = insert(CTO, { name: 'Sayo', uniqueId: 8, subordinates: [] });

const BACK_LEAD = insert(CTO, { name: 'Dev', uniqueId: 9, subordinates: [] });

const FRONT_LEAD = insert(CTO, { name: "seyi", uniqueId: 10, subordinates: [] });



async function main() {
    const test = new EmployeeOrgAppV2(CEO);

    // console.log({ ceo: JSON.stringify(test.ceo) }, "Initial Object")
    let ceopString = JSON.stringify(test.ceo);
    let parsedCEO = JSON.parse(ceopString);

    console.log({ceo : parsedCEO}, "Initial Object");
    test.move(10, 2);

    ceopString = JSON.stringify(test.ceo);
    parsedCEO = JSON.parse(ceopString);

    // console.log({ ceo: JSON.stringify(test.ceo) }, "After using move operation")
    console.log({ceo : parsedCEO}, "After using move operation");


    






    test.undo();

    ceopString = JSON.stringify(test.ceo);
    parsedCEO = JSON.parse(ceopString);

    // console.log({ ceo: JSON.stringify(test.ceo) }, "After using move operation")
    console.log({ceo : parsedCEO}, "After using undo operation");







    test.redo();

    ceopString = JSON.stringify(test.ceo);
    parsedCEO = JSON.parse(ceopString);

    // console.log({ ceo: JSON.stringify(test.ceo) }, "After using move operation")
    console.log({ceo : parsedCEO}, "After using redo operation");

    // await new Promise((resolve, _) => {
    //     setTimeout(() => {
    //         test.undo();
    //         console.log({ ceo: test.ceo }, "After using undo operation")
    //         resolve('');
    //     }, 2000)
    // })
    // test.undo(5, 9);
    // test.m(5, 9);




}

main()




