const mqttAssemblyName = "Blazor.MQTT.Chat";
const mqttNamespace = "Blazor.MQTT.Chat.JsInterop";
const mqttMethodName = "Handler";

const mqttOnConnectionChangedTypeName = "OnConnectionChanged";
const mqttOnMessageReceivedTypeName = "OnMessageReceived";

window.mqttFunctions = {

    createClient: function (wsHost, wsPort, clientId) {
        if (clientId === null || clientId === '') {
            clientId = "anonymousclient_" + parseInt(Math.random() * 100, 10);
        } else {
            clientId = clientId + parseInt(Math.random() * 100, 10);
        }
        pahoClient = new Paho.MQTT.Client(wsHost, wsPort, "/ws", clientId);

        pahoClient.onConnectionLost = function (responseObject) {
            console.log(responseObject);
            var methodOnConnectionChanged = Blazor.platform.findMethod(mqttAssemblyName, mqttNamespace, mqttOnConnectionChangedTypeName, mqttMethodName);
            Blazor.platform.callMethod(methodOnConnectionChanged, null, [Blazor.platform.toDotNetString("Connection Lost")]);
        };

        pahoClient.onMessageArrived = function (message) {
            console.log(message);
            console.log("RECEIVE ON " + message.destinationName + " PAYLOAD " + message.payloadString);

            var methodOnMessagedReceived = Blazor.platform.findMethod(mqttAssemblyName, mqttNamespace, mqttOnMessageReceivedTypeName, mqttMethodName);
            Blazor.platform.callMethod(methodOnMessagedReceived, null, [Blazor.platform.toDotNetString(message.destinationName), Blazor.platform.toDotNetString(message.payloadString)]);
        };

        pahoClient.onMessageDelivered = function (message) {
            console.log(message);
            console.log("PUBLISHED ON " + message.destinationName + " PAYLOAD " + message.payloadString);
        };
    },

    connect: function (topic, qos, timeout, username, password) {
        var options = {
            timeout: timeout,
            userName: username,
            password: password,
            reconnect: true,
            onSuccess: function () {
                pahoClient.subscribe(topic, { qos: qos });

                var methodOnConnectionChanged = Blazor.platform.findMethod(mqttAssemblyName, mqttNamespace, mqttOnConnectionChangedTypeName, mqttMethodName);
                Blazor.platform.callMethod(methodOnConnectionChanged, null, [Blazor.platform.toDotNetString("Connected")]);
            },
            onFailure: function (message) {
                var methodOnConnectionChanged = Blazor.platform.findMethod(mqttAssemblyName, mqttNamespace, mqttOnConnectionChangedTypeName, mqttMethodName);
                Blazor.platform.callMethod(methodOnConnectionChanged, null, [Blazor.platform.toDotNetString("Connection Failure")]);
            }
        };

        if (pahoClient.host.toLowerCase().startsWith("https")) {
            options.useSSL = true;
        }
        pahoClient.connect(options);
    },

    disconnect: function () {
        pahoClient.disconnect();
    },

    publish: function (topic, payload, qos, retained) {
        pahoClient.publish(topic, payload, qos, retained);
    },

    pahoClient: any = null
};