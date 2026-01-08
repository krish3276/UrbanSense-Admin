import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Chip,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  EmojiEvents,
  Speed,
  ThumbUp,
  Assignment,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { officers, departments } from '../../data/mockData';

const Performance = () => {
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter officers
  const filteredOfficers = officers.filter((officer) => {
    const matchesSearch = officer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || officer.department === filterDepartment;
    return matchesSearch && matchesDepartment && officer.status === 'active';
  });

  // Sort by performance score
  const sortedOfficers = [...filteredOfficers].sort(
    (a, b) => b.resolvedComplaints * b.feedbackScore - a.resolvedComplaints * a.feedbackScore
  );

  // Top performers
  const topPerformers = sortedOfficers.slice(0, 5);

  // Department-wise performance
  const departmentPerformance = departments.map((dept) => {
    const deptOfficers = officers.filter((o) => o.department === dept.name && o.status === 'active');
    const totalResolved = deptOfficers.reduce((acc, o) => acc + o.resolvedComplaints, 0);
    const avgResponseTime =
      deptOfficers.length > 0
        ? deptOfficers.reduce((acc, o) => acc + o.avgResponseTime, 0) / deptOfficers.length
        : 0;
    const avgFeedback =
      deptOfficers.length > 0
        ? deptOfficers.reduce((acc, o) => acc + o.feedbackScore, 0) / deptOfficers.length
        : 0;
    return {
      department: dept.name.split(' ')[0],
      fullName: dept.name,
      officers: deptOfficers.length,
      resolved: totalResolved,
      responseTime: avgResponseTime.toFixed(1),
      feedback: avgFeedback.toFixed(1),
      color: dept.color,
    };
  });

  // Radar chart data for top performers
  const radarData = topPerformers.map((officer) => ({
    name: officer.name.split(' ')[0],
    complaints: Math.min(officer.resolvedComplaints / 2, 100),
    speed: Math.max(0, 100 - officer.avgResponseTime * 20),
    feedback: officer.feedbackScore * 20,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPerformanceLevel = (officer) => {
    const score = (officer.resolvedComplaints / 20) * officer.feedbackScore;
    if (score > 30) return { label: 'Excellent', color: 'success' };
    if (score > 20) return { label: 'Good', color: 'info' };
    if (score > 10) return { label: 'Average', color: 'warning' };
    return { label: 'Needs Improvement', color: 'error' };
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Officer Performance
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and analyze officer performance metrics
        </Typography>
      </Box>

      {/* Top Performers */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        🏆 Top Performers
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {topPerformers.map((officer, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={officer.id}>
            <Card
              sx={{
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible',
                pt: 3,
              }}
            >
              {index === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'warning.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 20 }} />
                </Box>
              )}
              <CardContent>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: 'primary.main',
                    fontSize: 24,
                    margin: '0 auto 12px',
                  }}
                >
                  {officer.name.charAt(0)}
                </Avatar>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {officer.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {officer.department.split(' ')[0]}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    {officer.resolvedComplaints}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Resolved
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Rating value={officer.feedbackScore} precision={0.1} size="small" readOnly />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Department Performance Bar Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Department-wise Comparison
              </Typography>
              <Box sx={{ height: 350, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="department" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="resolved" name="Complaints Resolved" fill="#1976d2" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="officers" name="Active Officers" fill="#7b1fa2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Radar Chart */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Top 5 Performance Metrics
              </Typography>
              <Box sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Complaints"
                      dataKey="complaints"
                      stroke="#1976d2"
                      fill="#1976d2"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Speed"
                      dataKey="speed"
                      stroke="#2e7d32"
                      fill="#2e7d32"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Feedback"
                      dataKey="feedback"
                      stroke="#ed6c02"
                      fill="#ed6c02"
                      fillOpacity={0.3}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Department Summary Cards */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Department Performance Summary
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {departmentPerformance.map((dept) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dept.fullName}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {dept.fullName}
                  </Typography>
                  <Chip label={`${dept.officers} officers`} size="small" variant="outlined" />
                </Box>
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Assignment sx={{ color: 'primary.main', fontSize: 20 }} />
                      <Typography variant="h6" fontWeight={600}>
                        {dept.resolved}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Resolved
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Speed sx={{ color: 'warning.main', fontSize: 20 }} />
                      <Typography variant="h6" fontWeight={600}>
                        {dept.responseTime}h
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Avg. Time
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <ThumbUp sx={{ color: 'success.main', fontSize: 20 }} />
                      <Typography variant="h6" fontWeight={600}>
                        {dept.feedback}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Rating
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* All Officers Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              All Officers Performance
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search officer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={filterDepartment}
                  label="Department"
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Officer</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell align="center">Resolved</TableCell>
                  <TableCell align="center">Avg. Response</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="center">Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedOfficers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((officer, index) => {
                    const performance = getPerformanceLevel(officer);
                    return (
                      <TableRow key={officer.id} hover>
                        <TableCell>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            sx={{
                              color: index < 3 ? 'warning.main' : 'text.primary',
                            }}
                          >
                            #{page * rowsPerPage + index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {officer.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {officer.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {officer.area}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={officer.department}
                            size="small"
                            sx={{
                              bgcolor:
                                departments.find((d) => d.name === officer.department)?.color + '20',
                              color: departments.find((d) => d.name === officer.department)?.color,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle2" fontWeight={600}>
                            {officer.resolvedComplaints}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">{officer.avgResponseTime}h</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <Rating value={officer.feedbackScore} precision={0.1} size="small" readOnly />
                            <Typography variant="caption">({officer.feedbackScore})</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={performance.label}
                            size="small"
                            color={performance.color}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sortedOfficers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Performance;
