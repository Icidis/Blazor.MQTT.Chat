using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.MQTT.Chat.JsInterop
{
    public class MqttJsInterop
    {
        private readonly IJSRuntime _jsRuntime;

        public MqttJsInterop(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
        }

        public async Task<object> CreateClient(string wsHost, int wsPort, string clientId)
        {
            return await _jsRuntime.InvokeAsync<object>(
                "mqttFunctions.createClient",
                wsHost, wsPort, clientId);
        }

        public async Task<object> Connect(string topic, int qos, int timeout, string username, string password)
        {
            return await _jsRuntime.InvokeAsync<object>(
                "mqttFunctions.connect",
                topic, qos, timeout, username, password);
        }

        public async Task<object> Disconnect()
        {
            return await _jsRuntime.InvokeAsync<object>(
                "mqttFunctions.disconnect");
        }

        public async Task<object> Publish(string topic, string payload, int qos, bool retained)
        {
            return await _jsRuntime.InvokeAsync<object>(
                "mqttFunctions.publish",
                topic, payload, qos, retained);
        }
    }
}