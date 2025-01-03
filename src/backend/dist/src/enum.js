"use strict";
var Role;
(function (Role) {
    Role[Role["admin"] = 0] = "admin";
    Role[Role["cashier"] = 1] = "cashier";
    Role[Role["user"] = 2] = "user";
    Role[Role["chef"] = 3] = "chef";
    Role[Role["waiter"] = 4] = "waiter";
})(Role || (Role = {}));
var tableStatus;
(function (tableStatus) {
    tableStatus[tableStatus["idle"] = 0] = "idle";
    tableStatus[tableStatus["busy"] = 1] = "busy";
    tableStatus[tableStatus["ordered"] = 2] = "ordered";
})(tableStatus || (tableStatus = {}));
