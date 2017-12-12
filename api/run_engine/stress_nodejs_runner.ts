import { TestCase, StressRequest } from '../interfaces/dto_stress_setting';
import { Log } from '../utils/log';
import { RecordRunner } from './record_runner';
import { StressMessageType } from '../common/stress_type';

Log.init();

let testCase: TestCase;

process.on('message', (msg: StressRequest) => {
    if (msg.type === StressMessageType.start) {
        run();
    } else if (msg.type === StressMessageType.task) {
        testCase = msg.testCase;
        process.send('ready');
    }
});

function run() {
    RecordRunner.runRecords(testCase.records, testCase.envId, true, 'placeholder', true, msg => process.send(msg));
}