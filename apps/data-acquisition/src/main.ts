import { Connection } from '@humidity-serv/tinkerforge'
import { environment } from './environments/environment'

const con = new Connection(environment.host, environment.port)
con.connect()

console.log('Press any key to exit ...')
process.stdin.on('data', () => {
  con.disconnect()
  process.exit(0)
})

/*

ipcon = new Tinkerforge.IPConnection(); // Create IP connection
ipcon.connect(HOST, PORT,
    function(error) {
        console.log('Error: '+error);
    }
); // Connect to brickd

// Register Connected Callback
ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function(connectReason) {
        // Trigger Enumerate
        ipcon.enumerate();
    }
);

// Register Enumerate Callback
ipcon.on(Tinkerforge.IPConnection.CALLBACK_ENUMERATE,
    // Print incoming enumeration
    function(uid, connectedUid, position, hardwareVersion, firmwareVersion,
             deviceIdentifier, enumerationType) {
        console.log('UID:               '+uid);
        console.log('Enumeration Type:  '+enumerationType);

        if(enumerationType === Tinkerforge.IPConnection.ENUMERATION_TYPE_DISCONNECTED) {
            console.log('');
            return;
        }

        console.log('Connected UID:     '+connectedUid);
        console.log('Position:          '+position);
        console.log('Hardware Version:  '+hardwareVersion);
        console.log('Firmware Version:  '+firmwareVersion);
        console.log('Device Identifier: '+deviceIdentifier);
        console.log('');
    }
);

console.log("Press any key to exit ...");
process.stdin.on('data',
    function(data) {
        ipcon.disconnect();
        process.exit(0);
    }
);
 */
/*
var HOST = 'localhost';
var PORT = 4223;
var UID = 'XXYYZZ'; // Change XXYYZZ to the UID of your Master Brick

var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
var master = new Tinkerforge.BrickMaster(UID, ipcon); // Create device object

ipcon.connect(HOST, PORT,
    function (error) {
        console.log('Error: ' + error);
    }
); // Connect to brickd
// Don't use device before ipcon is connected

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function (connectReason) {
        // Get current stack voltage
        master.getStackVoltage(
            function (stackVoltage) {
                console.log('Stack Voltage: ' + stackVoltage/1000.0 + ' V');
            },
            function (error) {
                console.log('Error: ' + error);
            }
        );

        // Get current stack current
        master.getStackCurrent(
            function (stackCurrent) {
                console.log('Stack Current: ' + stackCurrent/1000.0 + ' A');
            },
            function (error) {
                console.log('Error: ' + error);
            }
        );
    }
);

console.log('Press key to exit');
process.stdin.on('data',
    function (data) {
        ipcon.disconnect();
        process.exit(0);
    }
);

 */
