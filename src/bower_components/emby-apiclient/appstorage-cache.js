define([], function() {
    "use strict";

    function MyStore() {}

    function updateCache(instance) {
        instance.cache.put("data", new Response(JSON.stringify(instance.localData)))
    }
    return MyStore.prototype.init = function() {
        var instance = this;
        return caches.open("embydata").then(function(result) {
            instance.cache = result, instance.localData = {}
        })
    }, MyStore.prototype.setItem = function(name, value) {
        if (this.localData) {
            this.localData[name] !== value && (this.localData[name] = value, updateCache(this))
        }
    }, MyStore.prototype.getItem = function(name) {
        if (this.localData) return this.localData[name]
    }, MyStore.prototype.removeItem = function(name) {
        this.localData && (this.localData[name] = null, delete this.localData[name], updateCache(this))
    }, new MyStore
});