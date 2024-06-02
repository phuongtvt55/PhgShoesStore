import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

function SelectAddress({ selectedAddress, setSelectedAddress, errorMess }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCity && selectedDistrict && selectedWard) {
      const city = cities.find((city) => city.Id === selectedCity);
      const district = city.Districts.find(
        (district) => district.Id === selectedDistrict
      );
      const ward = district.Wards.find((ward) => ward.Id === selectedWard);

      setSelectedAddress(`${ward.Name}, ${district.Name}, ${city.Name}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, selectedDistrict, selectedWard, cities]);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setSelectedWard("");
    if (cityId !== "") {
      const city = cities.find((city) => city.Id === cityId);
      setDistricts(city.Districts);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard("");
    if (districtId !== "") {
      const city = cities.find((city) => city.Id === selectedCity);
      const district = city.Districts.find(
        (district) => district.Id === districtId
      );
      setWards(district.Wards);
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  return (
    <Box>
      <Box display={"flex"}>
        <FormControl fullWidth>
          <InputLabel id="city-label">Tỉnh/Thành</InputLabel>
          <Select
            labelId="city-label"
            id="city"
            value={selectedCity}
            label="Chọn tỉnh thành"
            error={errorMess.address}
            onChange={handleCityChange}
          >
            {cities.map((city) => (
              <MenuItem key={city.Id} value={city.Id}>
                {city.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={selectedCity.length === 0}>
          <InputLabel id="district-label">Quận/Huyện</InputLabel>
          <Select
            labelId="district-label"
            id="district"
            value={selectedDistrict}
            label="Chọn quận huyện"
            onChange={handleDistrictChange}
            error={errorMess.address}
          >
            {districts.map((district) => (
              <MenuItem
                sx={{ width: "400px" }}
                key={district.Id}
                value={district.Id}
              >
                {district.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={selectedDistrict.length === 0}>
          <InputLabel id="ward-label">Phường/Xã</InputLabel>
          <Select
            labelId="ward-label"
            id="ward"
            value={selectedWard}
            label="Chọn phường xã"
            onChange={handleWardChange}
            error={errorMess.address}
          >
            {wards.map((ward) => (
              <MenuItem key={ward.Id} value={ward.Id}>
                {ward.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedAddress && (
        <Typography mt={2}>Selected address: {selectedAddress}</Typography>
      )}
      {errorMess.address && (
        <Typography color={"red"} variant="caption" ml={2}>
          {errorMess.address}
        </Typography>
      )}
    </Box>
  );
}

export default SelectAddress;
