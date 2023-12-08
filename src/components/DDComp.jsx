import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Divider,
} from "@material-ui/core";
import useFetchData from "../hooks/fetchData";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  typography: {
    fontSize: "0.7em",
  },
  select: {
    height: "12px",
    fontSize: "0.7em",
    padding: 10,
    width: 120,
  },
  customMenu: {
    maxHeight: "200px",
  },
  dateField: {
    height: "12px",
  },
}));

const DDComp = () => {
  const classes = useStyles();
  const base_url = process.env.REACT_APP_BASE_URL;
  // dates
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 16));
  // clients
  const [client, setClient] = useState("");
  const { data: clientData } = useFetchData(`${base_url}/clientlist`);
  // companies
  const [companies, setCompanies] = useState([]);
  const { data: companyData } = useFetchData(
    `${base_url}/companylist/${client}`
  );
  // languages
  const [languages, setLanguages] = useState([]);
  const { data: languageData } = useFetchData(`${base_url}/languagelist/`);
  // publication group
  const [publicationGroup, setPublicationGroup] = useState("");
  const { data: publicationGroupData, loading: publicationGroupDataLoading } =
    useFetchData(`${base_url}/publicationgroups/`);
  // publication
  const [publications, setPublications] = useState("");
  const { data: publicationsdata } = useFetchData(
    `${base_url}/publications/${publicationGroup}`
  );
  // qc1Userlist
  const [qc1Users, setQC1Users] = useState([]);
  const { data: qc1UserData } = useFetchData(`${base_url}/qcuserlist/`);
  // qc2userlist
  const [qc2Users, setQC2Users] = useState([]);
  const { data: qc2UserData } = useFetchData(`${base_url}/qcuserlist/`);
  // loading for dropdown
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const handleDropdownOpen = () => {
    setDropdownLoading(true);

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setDropdownLoading(false);
    }, 2000); // Adjust this time to mimic the actual loading time of the dropdown
  };
  return (
    <div className="relative">
      <hr />
      {/* loader */}
      <div className="absolute">{dropdownLoading && <Loader />}</div>
      <div>
        {/* divided in two sections */}
        {/* first section */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* client */}
          <div className="flex items-center justify-start gap-4 ml-2">
            {/* title */}
            <Typography className={classes.typography}>Client</Typography>
            {/* first ddw */}
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={`${classes.select}`}
                value={client}
                onChange={(e) => setClient(e.target.value)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom", // Position of the menu relative to the dropdown
                    horizontal: "left", // Position of the menu relative to the dropdown
                  },
                  transformOrigin: {
                    vertical: "top", // Position of the selected item relative to the dropdown
                    horizontal: "left", // Position of the selected item relative to the dropdown
                  },
                  getContentAnchorEl: null,
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      width: 200,
                    },
                  },
                }}
              >
                {clientData?.clients &&
                  clientData.clients.map((item) => (
                    <MenuItem value={item.clientid} key={item.clientid}>
                      {item.clientname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* second ddw */}
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={`${classes.select} ${classes.customMenu}`}
                placeholder="select"
              >
                <MenuItem value={10}>With Category</MenuItem>
                <MenuItem value={20}>No Category</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* category */}
          <div className="flex items-center justify-start gap-4 ml-2">
            <Typography className={classes.typography}>Category</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* publication group */}
          <div className="flex items-center justify-start gap-4 ml-2">
            <Typography className={classes.typography}>
              Publication group
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
                value={publicationGroup}
                onChange={(e) => setPublicationGroup(e.target.value)}
                onOpen={handleDropdownOpen}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      width: 200,
                    },
                  },
                }}
              >
                {publicationGroupData?.publication_groups &&
                  publicationGroupData.publication_groups.map((items) => (
                    <MenuItem
                      value={items.publicationgroupid}
                      key={items.publicationgroupid}
                    >
                      {items.publicationgroupname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          {/* reporting subject */}
          <div className="flex items-center justify-start gap-4 ml-2">
            <Typography className={classes.typography}>
              Reporting Subject
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* from date */}
          <div className="flex items-center justify-start gap-4 ml-2">
            <Typography className={classes.typography}>From Date</Typography>
            <TextField
              type="datetime-local"
              variant="outlined"
              size="small"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          {/* reporting tone */}
          <div className="flex items-center justify-start gap-4 ml-2">
            <Typography className={classes.typography}>
              Reporting Tone
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <span className="flex items-center gap-2">
              <TextField type="checkbox" size="small" />
              <Typography className={classes.typography}>No Company</Typography>
            </span>
          </div>
          {/*  Search Keyword*/}
          <div className="flex items-center justify-start gap-4 ml-2">
            <Typography className={classes.typography}>
              Search Keyword
            </Typography>
            <TextField
              placeholder="Select Keyword"
              variant="outlined"
              size="small"
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>OR</MenuItem>
                <MenuItem value={20}>AND</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Divider style={{ margin: 2 }} />
        {/* divider */}
        {/* second section */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* company */}
          <div className="flex items-center justify-start gap-4 ml-2">
            <Typography className={classes.typography}>Company</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
                multiple
                value={companies}
                onChange={(e) => setCompanies(e.target.value)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom", // Position of the menu relative to the dropdown
                    horizontal: "left", // Position of the menu relative to the dropdown
                  },
                  transformOrigin: {
                    vertical: "top", // Position of the selected item relative to the dropdown
                    horizontal: "left", // Position of the selected item relative to the dropdown
                  },
                  getContentAnchorEl: null,
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      width: 200,
                    },
                  },
                }}
              >
                {companyData?.companies?.length > 0 &&
                  companyData.companies.map((items) => (
                    <MenuItem value={items.companyid} key={items.companyid}>
                      {items.companyname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          {/* city and language */}
          <div className="flex items-center justify-start gap-4 ml-2">
            {/* city */}
            <Typography className={classes.typography}>City</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>OR</MenuItem>
                <MenuItem value={20}>AND</MenuItem>
              </Select>
            </FormControl>
            {/* language */}
            <Typography className={classes.typography}>Language</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
                multiple
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      width: 200,
                    },
                  },
                }}
              >
                {languageData?.languages &&
                  Object.entries(languageData.languages).map(
                    ([languageName, languageCode]) => (
                      <MenuItem key={languageCode} value={languageCode}>
                        {languageName}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
          </div>
          {/* Publication and pubtype */}
          <div className="flex items-center justify-start gap-4 ml-2">
            {/* publication */}
            <Typography className={classes.typography}>Publication</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
                value={publications}
                onChange={(e) => setPublications(e.target.value)}
              >
                {publicationsdata?.publications?.length > 0 &&
                  publicationsdata.publications.map((items) => (
                    <MenuItem
                      key={items.publicationid}
                      value={items.publicationid}
                    >
                      {items.publicationname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* pub type */}
            <Typography className={classes.typography}>Pub Type</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>DAILY</MenuItem>
                <MenuItem value={20}>MAGAZINE</MenuItem>
                <MenuItem value={20}>ALL</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* System ArticalId */}
          <div className="flex items-center justify-start gap-4 ml-2">
            <Typography className={classes.typography}>
              {" "}
              System ArticalId
            </Typography>
            <TextField variant="outlined" size="small" />
          </div>
          {/* to date */}
          <div className="flex items-center justify-start gap-4 ml-2 mt-2">
            <Typography className={classes.typography}>To Date</Typography>
            <TextField
              type="datetime-local"
              variant="outlined"
              size="small"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          {/* qc2 and qc1 */}
          <div className="flex items-center justify-start gap-4 ml-2">
            {/* qc2 */}
            <Typography className={classes.typography}>QC 2</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>NO</MenuItem>
                <MenuItem value={20}>YES</MenuItem>
                <MenuItem value={20}>PARTIAL NO</MenuItem>
                <MenuItem value={20}>ALL</MenuItem>
              </Select>
            </FormControl>
            {/* qc1 */}
            <Typography className={classes.typography}>QC 1</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>YES</MenuItem>
                <MenuItem value={20}>NO</MenuItem>
                <MenuItem value={20}>ALL</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* page number, Artical Type & TV  */}
          <div className="flex items-center justify-start gap-4 ml-2">
            {/* page number */}
            <Typography className={classes.typography}>Page Number</Typography>
            <TextField variant="outlined" placeholder="0" size="small" />
            {/* artical type */}
            <Typography className={classes.typography}>Artcal Type</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem>PRINT</MenuItem>
                <MenuItem>INTERNET</MenuItem>
                <MenuItem>ALL</MenuItem>
              </Select>
            </FormControl>
            {/* TV */}
            <Typography className={classes.typography}>TV</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={classes.select}
                placeholder="select"
              >
                <MenuItem value={10}>ALL</MenuItem>
                <MenuItem value={20}>YES</MenuItem>
                <MenuItem value={20}>NO</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <Divider style={{ margin: 2 }} />
      {/* third section of search bar and qc users ddw */}
      <div className="flex items-center gap-2 mt-1 ml-2">
        {/* search content/headline */}
        <div className="flex items-center">
          <Typography className={classes.typography}>
            Search Content/headline
          </Typography>
          <TextField
            id=""
            placeholder="Search"
            size="small"
            variant="outlined"
          />
        </div>
        {/* search only headline */}
        <div className="flex items-center">
          <Typography className={classes.typography}>
            Search Only Headlines
          </Typography>
          <TextField
            id=""
            placeholder="Search"
            size="small"
            variant="outlined"
          />
        </div>
        {/* Manual prominence */}
        <div className="flex items-center">
          <Typography className={classes.typography}>
            Manual Prominence
          </Typography>
          <TextField
            id=""
            placeholder="Search"
            size="small"
            variant="outlined"
          />
        </div>
        {/* qc1by user */}
        <div className="flex items-center">
          <Typography className={classes.typography}>QC1 by User</Typography>
          <FormControl
            size="small"
            variant="outlined"
            className={classes.formControl}
          >
            <Select
              className={classes.select}
              multiple
              value={qc1Users}
              onChange={(e) => setQC1Users(e.target.value)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    width: 200,
                  },
                },
              }}
            >
              {qc1UserData?.qc_users?.length > 0 &&
                qc1UserData.qc_users.map((item) => (
                  <MenuItem value={item.usersid} key={item.username}>
                    {item.username}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        {/* qc2 by user */}
        <div className="flex items-center">
          <Typography className={classes.typography}>QC2 by User</Typography>
          <FormControl
            size="small"
            variant="outlined"
            className={classes.formControl}
          >
            <Select
              className={classes.select}
              multiple
              value={qc2Users}
              onChange={(e) => setQC2Users(e.target.value)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    width: 200,
                  },
                },
              }}
            >
              {qc2UserData?.qc_users?.length > 0 &&
                qc2UserData.qc_users.map((item) => (
                  <MenuItem value={item.usersid} key={item.username}>
                    {item.username}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <hr className="mt-1" />
    </div>
  );
};

export default DDComp;
