import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Text,
  Heading,
  Textarea,
  Button,
  Select,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
} from "@chakra-ui/react";

const CompleteSumurForm = () => {
  const [casingData, setCasingData] = useState([]);
  const [depthData, setDepthData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [personnelData, setPersonnelData] = useState([]);
  const [hazardData, setHazardData] = useState([]);
  const [otherFileData, setOtherFileData] = useState([]);
  console.log(casingData, depthData, scheduleData, personnelData, hazardData);
  
  const [currentCasing, setCurrentCasing] = useState({
    type: "",
    innerDiameter: "",
    outerDiameter: "",
    weight: "",
    grade: "",
    startDepth: "",
    endDepth: "",
  });
  const [currentDepth, setCurrentDepth] = useState({
    days: "",
    startDepth: "",
    endDepth: "",
  });
  const [currentSchedule, setCurrentSchedule] = useState({
    kegiatan: "",
    startDate: "",
    endDate: "",
    keterangan: "",
  });
  const [currentPersonnel, setCurrentPersonnel] = useState({
    posisi: "",
    nama: "",
    sertifikat: null,
  });
  const [currentHazard, setCurrentHazard] = useState({
    type: "",
    deskripsi: "",
    severity: "",
    mitigasi: "",
    keterangan: "",
  });
  const [currentFile, setCurrentFile] = useState({ file: null });

  const addToTable = (currentData, setTableData, resetCurrentData) => {
    setTableData((prev) => [...prev, currentData]);
    resetCurrentData();
  };

  // ... [Previous form sections remain unchanged] ...

  return (
    <Box
      maxWidth="100%"
      margin="auto"
      padding={6}
      borderWidth={1}
      borderRadius="lg"
    >
      <VStack spacing={4} align="stretch" >
        <VStack spacing={4} align="stretch" borderRadius="lg" borderWidth={1} p={4}>
        <Heading as="h2" size="lg">
          Sumur
        </Heading>

        <HStack>
          <FormControl>
            <FormLabel>UWI</FormLabel>
            <Input placeholder="UWI" />
          </FormControl>
          <FormControl>
            <FormLabel>Field</FormLabel>
            <Input placeholder="Field" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Nama Sumur</FormLabel>
            <Input placeholder="Nama Sumur" />
          </FormControl>
          <FormControl>
            <FormLabel>Nama Lengkap Sumur</FormLabel>
            <Input placeholder="Nama Lengkap Sumur" />
          </FormControl>
        </HStack>

        <FormControl as="fieldset">
          <FormLabel as="legend">Pekerjaan</FormLabel>
          <RadioGroup>
            <HStack spacing={4}>
              <Radio value="eksplorasi">Eksplorasi</Radio>
              <Radio value="eksploitasi">Eksploitasi(Development)</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl as="fieldset">
          <FormLabel as="legend">Type Well</FormLabel>
          <RadioGroup>
            <HStack spacing={4}>
              <Radio value="wildcat">Wildcat</Radio>
              <Radio value="delineasi">Delineasi</Radio>
              <Radio value="infill">Infill</Radio>
              <Radio value="produser">Produser</Radio>
              <Radio value="stepout">Stepout</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>Well Status</FormLabel>
            <Input placeholder="Well Status" />
          </FormControl>
          <FormControl>
            <FormLabel>Profile_Type</FormLabel>
            <Input placeholder="Profile_Type" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Environment_Type</FormLabel>
            <Input placeholder="Environment_Type" />
          </FormControl>
          <FormControl>
            <FormLabel>Spud_date</FormLabel>
            <Input placeholder="Spud_date" type="date" />
          </FormControl>
        </HStack>

        <FormControl as="fieldset">
          <FormLabel as="legend">Tipe Kontrak</FormLabel>
          <RadioGroup>
            <HStack spacing={4}>
              <Radio value="grossSplit">Gross Split</Radio>
              <Radio value="costRecovery">Cost Recovery</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>No AFE</FormLabel>
            <Input placeholder="No AFE" />
          </FormControl>
          <FormControl>
            <FormLabel>Status AFE</FormLabel>
            <Input placeholder="Valid/Proses/Ditolak" />
          </FormControl>
          <FormControl>
            <FormLabel>Total Cost AFE Approve</FormLabel>
            <Input placeholder="Total Cost AFE Approve" />
          </FormControl>
        </HStack>

        <FormControl as="fieldset">
          <FormLabel as="legend">Re-entry</FormLabel>
          <RadioGroup>
            <HStack spacing={4}>
              <Radio value="ya">Ya</Radio>
              <Radio value="tidak">Tidak</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>Rencana Mulai Tajak</FormLabel>
            <Input placeholder="Rencana Mulai Tajak" type="date" />
          </FormControl>
          <FormControl>
            <FormLabel>Rencana Selesai Operasi</FormLabel>
            <Input placeholder="Rencana Selesai Operasi" type="date" />
          </FormControl>
          <FormControl>
            <FormLabel>Rencana Total Budget</FormLabel>
            <Input placeholder="Rencana Total Budget" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Realisasi Mulai</FormLabel>
            <Input placeholder="Realisasi Mulai" type="date" />
          </FormControl>
          <FormControl>
            <FormLabel>Realisasi Selesai</FormLabel>
            <Input placeholder="Realisasi Selesai" type="date" />
          </FormControl>
          <FormControl>
            <FormLabel>Realisasi Total Budget</FormLabel>
            <Input placeholder="Realisasi Total Budget" />
          </FormControl>
        </HStack>
        </VStack>

        <VStack spacing={4} align="stretch" borderRadius="lg" borderWidth={1} p={4}>
        <Heading as="h2" size="lg" mt={6}>
          Lokasi
        </Heading>

        <FormControl as="fieldset">
          <FormLabel as="legend">Tujuan</FormLabel>
          <RadioGroup>
            <HStack spacing={4}>
              <Radio value="offshore">Offshore</Radio>
              <Radio value="onshore">Onshore</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl as="fieldset">
          <FormLabel as="legend">Satuan</FormLabel>
          <RadioGroup>
            <HStack spacing={4}>
              <Radio value="feet">Feet(Ft.)</Radio>
              <Radio value="meter">Meter(M)</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>Elevasi GL(Ground Level)</FormLabel>
            <Input placeholder="Elevasi GL" />
          </FormControl>
          <FormControl>
            <FormLabel>Elevasi RKB(Rotary Kelly Bushing)</FormLabel>
            <Input placeholder="Elevasi RKB" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Elevasi MSL(Mean Sea Level)</FormLabel>
            <Input placeholder="Elevasi MSL" />
          </FormControl>
          <FormControl>
            <FormLabel>Elevasi Derrick Floor</FormLabel>
            <Input placeholder="Elevasi Derrick Floor" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Azimuth / Kemiringan Maks</FormLabel>
            <Input placeholder="Azimuth / Kemiringan Maks" />
          </FormControl>
          <FormControl>
            <FormLabel>Kick Off Point(KOP)</FormLabel>
            <Input placeholder="KOP" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Depth Datum</FormLabel>
            <Input placeholder="Depth Datum" />
          </FormControl>
          <FormControl>
            <FormLabel>Drill Td</FormLabel>
            <Input placeholder="Drill Td" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Log Td</FormLabel>
            <Input placeholder="Log Td" />
          </FormControl>
          <FormControl>
            <FormLabel>Max TVD</FormLabel>
            <Input placeholder="Max TVD" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Project Depth</FormLabel>
            <Input placeholder="Project Depth" />
          </FormControl>
          <FormControl>
            <FormLabel>Final Td</FormLabel>
            <Input placeholder="Final Td" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Latitude Permukaan</FormLabel>
            <Input placeholder="Latitude Permukaan" />
          </FormControl>
          <FormControl>
            <FormLabel>Latitude Subsurface</FormLabel>
            <Input placeholder="Latitude Subsurface" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Longitude Permukaan</FormLabel>
            <Input placeholder="Longitude Permukaan" />
          </FormControl>
          <FormControl>
            <FormLabel>Longitude Subsurface</FormLabel>
            <Input placeholder="Longitude Subsurface" />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Keterangan</FormLabel>
          <Textarea placeholder="Keterangan" />
        </FormControl>
        </VStack>
        {/* ... [Previous form sections remain unchanged] ... */}

        {/* Casing Section */}
        <VStack spacing={4} align="stretch" borderRadius="lg" borderWidth={1} p={4}>
          <Heading as="h2" size="lg">
            Casing
          </Heading>
          <HStack alignItems="flex-start">
            <FormControl>
              <FormLabel>Tipe</FormLabel>
              <Select
                placeholder="Select Tipe"
                value={currentCasing.type}
                onChange={(e) =>
                  setCurrentCasing({ ...currentCasing, type: e.target.value })
                }
              >
                <option value="conductor">Conductor</option>
                <option value="surface">Surface</option>
                <option value="intermediate">Intermediate</option>
                <option value="production">Production</option>
                <option value="line">Line</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Upload File</FormLabel>
              <Input type="file" />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>Inner Diameter</FormLabel>
            <Input
              placeholder="Inner Diameter"
              value={currentCasing.innerDiameter}
              onChange={(e) =>
                setCurrentCasing({
                  ...currentCasing,
                  innerDiameter: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Outer Diameter</FormLabel>
            <Input
              placeholder="Outer Diameter"
              value={currentCasing.outerDiameter}
              onChange={(e) =>
                setCurrentCasing({
                  ...currentCasing,
                  outerDiameter: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Weight</FormLabel>
            <Input
              placeholder="Weight"
              value={currentCasing.weight}
              onChange={(e) =>
                setCurrentCasing({ ...currentCasing, weight: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Grade</FormLabel>
            <Input
              placeholder="Grade"
              value={currentCasing.grade}
              onChange={(e) =>
                setCurrentCasing({ ...currentCasing, grade: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Start Depth</FormLabel>
            <Input
              placeholder="Start Depth"
              value={currentCasing.startDepth}
              onChange={(e) =>
                setCurrentCasing({
                  ...currentCasing,
                  startDepth: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Depth</FormLabel>
            <Input
              placeholder="End Depth"
              value={currentCasing.endDepth}
              onChange={(e) =>
                setCurrentCasing({ ...currentCasing, endDepth: e.target.value })
              }
            />
          </FormControl>
          <Button
            onClick={() =>
              addToTable(currentCasing, setCasingData, () =>
                setCurrentCasing({
                  type: "",
                  innerDiameter: "",
                  outerDiameter: "",
                  weight: "",
                  grade: "",
                  startDepth: "",
                  endDepth: "",
                })
              )
            }
            colorScheme="blue"
          >
            Tambah Section
          </Button>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Tipe</Th>
                <Th>Inner Diameter</Th>
                <Th>Outer Diameter</Th>
                <Th>Weight</Th>
                <Th>Grade</Th>
                <Th>Start Depth</Th>
                <Th>End Depth</Th>
              </Tr>
            </Thead>
            <Tbody>
              {casingData.map((casing, index) => (
                <Tr key={index}>
                  <Td>{casing.type}</Td>
                  <Td>{casing.innerDiameter}</Td>
                  <Td>{casing.outerDiameter}</Td>
                  <Td>{casing.weight}</Td>
                  <Td>{casing.grade}</Td>
                  <Td>{casing.startDepth}</Td>
                  <Td>{casing.endDepth}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>

        {/* Depth vs Days Section */}
        <VStack spacing={4} align="stretch" borderRadius="lg" borderWidth={1} p={4}>
          <Heading as="h2" size="lg">
            Depth vs Days
          </Heading>
          <HStack justifyContent="space-between">
            <Text>Kegiatan</Text>
            <Button size="sm">Upload File</Button>
          </HStack>
          <FormControl>
            <FormLabel>Days</FormLabel>
            <Input
              placeholder="Days"
              value={currentDepth.days}
              onChange={(e) =>
                setCurrentDepth({ ...currentDepth, days: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Start Depth</FormLabel>
            <Input
              placeholder="Start Depth"
              value={currentDepth.startDepth}
              onChange={(e) =>
                setCurrentDepth({ ...currentDepth, startDepth: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Depth</FormLabel>
            <Input
              placeholder="End Depth"
              value={currentDepth.endDepth}
              onChange={(e) =>
                setCurrentDepth({ ...currentDepth, endDepth: e.target.value })
              }
            />
          </FormControl>
          <Button
            onClick={() =>
              addToTable(currentDepth, setDepthData, () =>
                setCurrentDepth({ days: "", startDepth: "", endDepth: "" })
              )
            }
            colorScheme="blue"
          >
            Tambah Section
          </Button>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Days</Th>
                <Th>Start Depth</Th>
                <Th>End Depth</Th>
              </Tr>
            </Thead>
            <Tbody>
              {depthData.map((depth, index) => (
                <Tr key={index}>
                  <Td>{depth.days}</Td>
                  <Td>{depth.startDepth}</Td>
                  <Td>{depth.endDepth}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>

        {/* Schedule Section */}
        <VStack spacing={4} align="stretch" borderRadius="lg" borderWidth={1} p={4}>
          <Heading as="h2" size="lg">
            Schedule
          </Heading>
          <HStack justifyContent="space-between">
            <Text>Kegiatan</Text>
            <Button size="sm">Upload File</Button>
          </HStack>
          <FormControl>
            <FormLabel>Kegiatan</FormLabel>
            <Input
              placeholder="Kegiatan"
              value={currentSchedule.kegiatan}
              onChange={(e) =>
                setCurrentSchedule({
                  ...currentSchedule,
                  kegiatan: e.target.value,
                })
              }
            />
          </FormControl>
          <HStack>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={currentSchedule.startDate}
                onChange={(e) =>
                  setCurrentSchedule({
                    ...currentSchedule,
                    startDate: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={currentSchedule.endDate}
                onChange={(e) =>
                  setCurrentSchedule({
                    ...currentSchedule,
                    endDate: e.target.value,
                  })
                }
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>Keterangan</FormLabel>
            <Textarea
              placeholder="Keterangan"
              value={currentSchedule.keterangan}
              onChange={(e) =>
                setCurrentSchedule({
                  ...currentSchedule,
                  keterangan: e.target.value,
                })
              }
            />
          </FormControl>
          <Button
            onClick={() =>
              addToTable(currentSchedule, setScheduleData, () =>
                setCurrentSchedule({
                  kegiatan: "",
                  startDate: "",
                  endDate: "",
                  keterangan: "",
                })
              )
            }
            colorScheme="blue"
          >
            Tambah Section
          </Button>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Kegiatan</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Keterangan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scheduleData.map((schedule, index) => (
                <Tr key={index}>
                  <Td>{schedule.kegiatan}</Td>
                  <Td>{schedule.startDate}</Td>
                  <Td>{schedule.endDate}</Td>
                  <Td>{schedule.keterangan}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>

        {/* Personnel Section */}
        <VStack
          spacing={4}
          align="stretch"
          borderWidth={1}
          borderRadius="lg"
          p={4}
        >
          <Heading as="h2" size="lg">
            Personel
          </Heading>
          <FormControl>
            <FormLabel>Posisi</FormLabel>
            <Input
              placeholder="Menyesuaikan backend"
              value={currentPersonnel.posisi}
              onChange={(e) =>
                setCurrentPersonnel({
                  ...currentPersonnel,
                  posisi: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nama</FormLabel>
            <Input
              placeholder="Nama"
              value={currentPersonnel.nama}
              onChange={(e) =>
                setCurrentPersonnel({
                  ...currentPersonnel,
                  nama: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Sertifikat</FormLabel>
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) =>
                setCurrentPersonnel({
                  ...currentPersonnel,
                  sertifikat: e.target.files[0],
                })
              }
            />
            <Text fontSize="sm" color="gray.500">
              Upload File Sertifikat PDF/JPG/PNG
            </Text>
          </FormControl>
          <Button
            onClick={() =>
              addToTable(currentPersonnel, setPersonnelData, () =>
                setCurrentPersonnel({ posisi: "", nama: "", sertifikat: null })
              )
            }
            colorScheme="blue"
          >
            Tambah Section
          </Button>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Posisi</Th>
                <Th>Nama</Th>
                <Th>Sertifikat</Th>
              </Tr>
            </Thead>
            <Tbody>
              {personnelData.map((person, index) => (
                <Tr key={index}>
                  <Td>{person.posisi}</Td>
                  <Td>{person.nama}</Td>
                  <Td>
                    {person.sertifikat ? person.sertifikat.name : "No file"}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>

        {/* Drilling Hazard Section */}
        <VStack
          spacing={4}
          align="stretch"
          borderWidth={1}
          borderRadius="lg"
          p={4}
        >
          <Heading as="h2" size="lg">
            Drilling Hazard
          </Heading>
          <FormControl>
            <FormLabel>Type Hazard</FormLabel>
            <Select
              placeholder="Select Tipe"
              value={currentHazard.type}
              onChange={(e) =>
                setCurrentHazard({ ...currentHazard, type: e.target.value })
              }
            >
              <option value="conductor">Conductor</option>
              <option value="surface">Surface</option>
              <option value="intermediate">Intermediate</option>
              <option value="production">Production</option>
              <option value="line">Line</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Hazard Deskripsi</FormLabel>
            <Textarea
              placeholder="Hazard Deskripsi"
              value={currentHazard.deskripsi}
              onChange={(e) =>
                setCurrentHazard({
                  ...currentHazard,
                  deskripsi: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl as="fieldset">
            <FormLabel as="legend">Severity</FormLabel>
            <RadioGroup
              value={currentHazard.severity}
              onChange={(value) =>
                setCurrentHazard({ ...currentHazard, severity: value })
              }
            >
              <Stack direction="row">
                <Radio value="ringan">Ringan</Radio>
                <Radio value="sedang">Sedang</Radio>
                <Radio value="tinggi">Tinggi</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Mitigasi</FormLabel>
            <Textarea
              placeholder="Mitigasi"
              value={currentHazard.mitigasi}
              onChange={(e) =>
                setCurrentHazard({ ...currentHazard, mitigasi: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Keterangan</FormLabel>
            <Textarea
              placeholder="Keterangan"
              value={currentHazard.keterangan}
              onChange={(e) =>
                setCurrentHazard({
                  ...currentHazard,
                  keterangan: e.target.value,
                })
              }
            />
          </FormControl>
          <Button
            onClick={() =>
              addToTable(currentHazard, setHazardData, () =>
                setCurrentHazard({
                  type: "",
                  deskripsi: "",
                  severity: "",
                  mitigasi: "",
                  keterangan: "",
                })
              )
            }
            colorScheme="blue"
          >
            Tambah Section
          </Button>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Type Hazard</Th>
                <Th>Deskripsi</Th>
                <Th>Severity</Th>
                <Th>Mitigasi</Th>
                <Th>Keterangan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hazardData.map((hazard, index) => (
                <Tr key={index}>
                  <Td>{hazard.type}</Td>
                  <Td>{hazard.deskripsi}</Td>
                  <Td>{hazard.severity}</Td>
                  <Td>{hazard.mitigasi}</Td>
                  <Td>{hazard.keterangan}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>

        {/* Other Files Section */}
        <VStack
          spacing={4}
          align="stretch"
          borderWidth={1}
          borderRadius="lg"
          p={4}
        >
          <Heading as="h2" size="lg">
            Berkas Lainnya
          </Heading>
          <FormControl>
            <FormLabel>Upload File</FormLabel>
            <Input
              type="file"
              onChange={(e) => setCurrentFile({ file: e.target.files[0] })}
            />
          </FormControl>
          <Button
            onClick={() =>
              addToTable(currentFile, setOtherFileData, () =>
                setCurrentFile({ file: null })
              )
            }
            colorScheme="blue"
          >
            Tambah Section
          </Button>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>File Name</Th>
                <Th>File Type</Th>
                <Th>File Size</Th>
              </Tr>
            </Thead>
            <Tbody>
              {otherFileData.map((file, index) => (
                <Tr key={index}>
                  <Td>{file.file ? file.file.name : "No file"}</Td>
                  <Td>{file.file ? file.file.type : "N/A"}</Td>
                  <Td>
                    {file.file
                      ? `${(file.file.size / 1024).toFixed(2)} KB`
                      : "N/A"}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>

        {/* Submit Button */}
        <Button colorScheme="blue" size="lg">
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default CompleteSumurForm;
