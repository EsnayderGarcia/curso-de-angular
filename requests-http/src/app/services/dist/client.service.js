"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var rxjs_1 = require("rxjs");
var alert_1 = require("../enumerations/alert");
var ClientService = /** @class */ (function () {
    function ClientService(http, spinner, alertModalService, router) {
        this.http = http;
        this.spinner = spinner;
        this.alertModalService = alertModalService;
        this.router = router;
        this.API = environment_1.environment.API + "clients";
    }
    ClientService.prototype.obterUriConsulta = function (queryParameters) {
        var uri = '';
        uri = this.API + '?';
        queryParameters.map(function (q) {
            if (q.value !== null)
                uri += q.name + "=" + q.value + "&";
        });
        return uri.substring(0, uri.length - 1);
    };
    ClientService.prototype.buscarClientesPaginados = function (queryParameters) {
        var _this = this;
        return this.http
            .get(this.obterUriConsulta(queryParameters))
            .pipe(rxjs_1.take(1), rxjs_1.catchError(function (e) {
            _this.spinner.hide();
            _this.alertModalService.abrirModal('Desculpe! Não foi possível obter os dados do servidor, tente novamente mais tarde.', alert_1.Alert.WARNING);
            _this.router.navigate(['home']);
            return rxjs_1.EMPTY;
        }));
    };
    ClientService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClientService);
    return ClientService;
}());
exports.ClientService = ClientService;
