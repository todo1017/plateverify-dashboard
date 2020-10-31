import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilCallback } from "recoil";
import schoolAtom from "atoms/admin/school";
import { initAction } from "actions/admin/school";
import { List, ListItem, Divider, Chip, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DataBox from "components/DataBox";
import PageAddLink from "components/PageAddLink";

const useStyles = makeStyles({
  root: {
    padding: 0
  },
  section: {
    display: 'flex',
    padding: 16,
    '& > *+*': {
      marginLeft: 32
    }
  },
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  spaceSmall: {
    '& > *+*': {
      marginTop: 8
    }
  },
  logo: {
    width: 100,
    '& > img': {
      width: '100%'
    }
  },
  name: {
    fontSize: 24,
    color: '#673ab7'
  },
  slug: {
    margin: 4
  },
  flexGrow: {
    flexGrow: 1
  }
});

const useEffectOnce = func => useEffect(func, []);

const SchoolList = () => {

  const classes = useStyles();
  const schoolState = useRecoilValue(schoolAtom);
  const schoolInit = useRecoilCallback(initAction);

  useEffectOnce(() => {
    schoolInit();
  });

  return (
    <div className={classes.space}>
      <PageAddLink to="/admin/school/create">
        New
      </PageAddLink>
      <DataBox
        height={100}
        loading={schoolState.isLoading}
        empty={schoolState.data.length === 0}
      >
        <List className={classes.root}>
          {schoolState.data.map(school =>
            <div key={school.id}>
              <ListItem className={classes.section}>
                <div className={classes.logo}>
                  <img src={school.logo} alt="" />
                </div>
                <div className={classes.spaceSmall}>
                  <div className={classes.name}>{school.name}</div>
                  <div>
                    <Chip size="small" className={classes.slug} label={school.slug} />
                    {school.cameras.map((camera, i) =>
                      <Chip
                        key={i}
                        size="small"
                        className={classes.slug}
                        label={camera.slug}
                      />
                    )}
                  </div>
                </div>
                <div className={classes.flexGrow}></div>
                <IconButton></IconButton>
                <Link to={`/admin/school/view/${school.id}`}>
                  <IconButton color="primary">
                    <ArrowForwardIcon />
                  </IconButton>
                </Link>
              </ListItem>
              <Divider />
            </div>
          )}
        </List>
      </DataBox>
    </div>
  );
};

SchoolList.title = "School List";

export default SchoolList;