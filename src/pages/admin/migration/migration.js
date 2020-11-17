import React, { useState, useEffect } from "react";
import api from "api";
import DataBox from "components/DataBox";
import MigrationStep from "components/admin/MigrationStep";

const useEffectOnce = func => useEffect(func, []);

const Migration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({});
  const [seek, setSeek] = useState(-1);

  useEffectOnce(() => {
    const getStatus = async () => {
      const response = await api.post('/data-migration/get_status');
      if (response) {
        let initStatus = {};
        let initSeek = -1;
        response.data.forEach((d, i) => {
          if (d.value === 'done') {
            initSeek = i;
          }
          initStatus[d.key] = d.value;
        });
        setStatus(initStatus);
        setSeek(initSeek);
      }
    };
    getStatus();
    const interval = setInterval(() => {
      getStatus();
    }, 5000);
    return () => clearInterval(interval);
  });

  const runMigration = async (file, step, index) => {
    setIsLoading(true);
    let data = new FormData();
    data.append('step', step);
    data.append('file', file);
    const response = await api.post('/data-migration/run_migrate', data);
    if (response) {
      setStatus({
        ...status,
        [step]: 'running'
      });
    }
    setIsLoading(false);
  };

  return (
    <DataBox height={100} loading={isLoading}>
      {seek > -2 && <MigrationStep title="School"   status={status.school}   run={file => runMigration(file, 'school', 0)}   loading={isLoading} />}
      {seek > -1 && <MigrationStep title="Camera"   status={status.camera}   run={file => runMigration(file, 'camera', 1)}   loading={isLoading} />}
      {seek > 0  && <MigrationStep title="Setting"  status={status.setting}  run={file => runMigration(file, 'setting', 2)}  loading={isLoading} />}
      {seek > 1  && <MigrationStep title="Offender" status={status.offender} run={file => runMigration(file, 'offender', 3)} loading={isLoading} />}
      {seek > 2  && <MigrationStep title="Member"   status={status.member}   run={file => runMigration(file, 'member', 4)}   loading={isLoading} />}
      {seek > 3  && <MigrationStep title="Vehicle"  status={status.vehicle}  run={file => runMigration(file, 'vehicle', 5)}  loading={isLoading} />}
      {seek > 4  && <MigrationStep title="Record"   status={status.record}   run={file => runMigration(file, 'record', 6)}   loading={isLoading} />}
      {seek > 5  && <MigrationStep title="User"     status={status.user}     run={file => runMigration(file, 'user', 7)}     loading={isLoading} />}
    </DataBox>
  );
};

Migration.title = "Data Migration";

export default Migration;