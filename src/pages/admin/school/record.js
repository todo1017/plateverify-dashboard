import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilCallback } from "recoil";
import { updateSchoolAction } from "actions/admin/school";
import api from "api";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DataBox from "components/DataBox";
import PageBackLink from "components/PageBackLink";
import CameraHead from "components/admin/CameraHead";
import CameraItem from "components/admin/CameraItem";
import SchoolGeneral from "components/admin/SchoolGeneral";
import SchoolLogo from "components/admin/SchoolLogo";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  padding: {
    padding: 16
  },
  title: {
    fontWeight: 'bold',
    color: '#CCC'
  },
  content: {
    marginTop: 32,
    marginLeft: 32,
    '& > *+*': {
      marginTop: 16
    }
  },
  logo: {
    textAlign: 'center',
    '& > img': {
      width: 200,
      padding: 8,
      border: '1px dashed #673ab7',
      borderRadius: 6
    }
  },
});

const useEffectOnce = func => useEffect(func, []);

const SchoolEdit = () => {

  const classes = useStyles();
  const { id } = useParams();
  const updateSchool = useRecoilCallback(updateSchoolAction);
  const [school, setSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffectOnce(() => {
    const load = async () => {
      setIsLoading(true);
      const response = await api.post('/school/detail', { id });
      if (response) {
        setSchool(response.data);
      }
      setIsLoading(false);
    };
    load();
  });

  const handleLogoUpdate = async (logo) => {
    let data = new FormData();
    data.append('id', id);
    data.append('file', logo);

    setIsLoading(true);
    const response = await api.post('/school/update_logo', data);
    setIsLoading(false);

    if (response) {
      const _school = { ...school, logo: response.data.logo };
      setSchool(_school);
      updateSchool(_school);
      return true;
    }
    return false;
  };

  const handleGeneralUpdate = async (data) => {
    setIsLoading(true);
    const response = await api.post('/school/update_general', data);
    setIsLoading(false);

    if (response) {
      const _school = {
        ...school,
        name: response.data.name,
        live: response.data.live,
        timezone: response.data.timezone,
      };
      setSchool(_school);
      updateSchool(_school);
    }
  };

  const handleAddCamera = async data => {
    setIsLoading(true);
    const response = await api.post('/school/update_cameras', {
      id,
      cameras: [
        ...school.cameras,
        data
      ]
    });
    setIsLoading(false);

    if (response) {
      const _school = {
        ...school,
        cameras: response.data.cameras,
      };
      setSchool(_school);
      updateSchool(_school);
    }
  };

  const handleRemoveCamera = async index => {
    setIsLoading(true);
    const cameras = school.cameras.filter((c, i) => i !== index);
    const response = await api.post('/school/update_cameras', {id, cameras});
    setIsLoading(false);

    if (response) {
      const _school = {
        ...school,
        cameras: response.data.cameras,
      };
      setSchool(_school);
      updateSchool(_school);
    }
  };

  return (
    <div className={classes.space}>
      <PageBackLink to="/admin/school">
        Schools
      </PageBackLink>
      <DataBox height={100} loading={isLoading}>
        {school &&
          <div>
            <div className={classes.padding}>
              <div className={classes.title}>LOGO</div>
              <div className={classes.content}>
                <SchoolLogo
                  school={school}
                  loading={isLoading}
                  onUpdate={handleLogoUpdate}
                />
              </div>
            </div>
            <Divider />
            <div className={classes.padding}>
              <div className={classes.title}>GENERAL</div>
              <div className={classes.content}>
                <SchoolGeneral
                  school={school}
                  loading={isLoading}
                  onUpdate={handleGeneralUpdate}
                />
              </div>
            </div>
            <Divider />
            <div className={classes.padding}>
              <div className={classes.title}>CAMERA</div>
              <div className={classes.content}>
                <div>
                  <CameraHead loading={isLoading} onCreate={handleAddCamera}/>
                  {school.cameras.map((camera, id) =>
                    <CameraItem
                      key={id}
                      camera={camera}
                      loading={isLoading}
                      onRemove={() => handleRemoveCamera(id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      </DataBox>
    </div>
  );
};

SchoolEdit.title = "School Configuration";

export default SchoolEdit;