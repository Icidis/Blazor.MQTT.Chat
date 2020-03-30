using Microsoft.JSInterop;

namespace Blazor.MQTT.Chat.JsInterop
{
    public class MqttJsInterop
    {
        private readonly IJSRuntime _jsRuntime;

        public MqttJsInterop(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
        }

        public async void CreateClient(string wsHost, int wsPort, string clientId)
        {
            await _jsRuntime.InvokeVoidAsync(
                "mqttFunctions.createClient",
                wsHost, wsPort, clientId);
        }

        public async void Connect(string topic, int qos, int timeout, string username, string password)
        {
            await _jsRuntime.InvokeVoidAsync(
                "mqttFunctions.connect",
                topic, qos, timeout, username, password);
        }

        public async void Disconnect()
        {
            await _jsRuntime.InvokeVoidAsync(
                "mqttFunctions.disconnect");
        }

        public async void Publish(string topic, string payload, int qos, bool retained)
        {
            await _jsRuntime.InvokeVoidAsync(
                "mqttFunctions.publish",
                topic, payload, qos, retained);
        }
    }
}