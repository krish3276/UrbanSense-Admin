import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { departmentAnalytics, monthlyTrends, departments } from '../../data/mockData';
import { useState } from 'react';

const COLORS = ['#1976d2', '#2e7d32', '#ed6c02', '#d32f2f', '#7b1fa2', '#0097a7'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');

  // Prepare data for resolution time comparison
  const resolutionTimeData = departmentAnalytics.map((dept) => ({
    department: dept.department.split(' ')[0], // Shortened name
    avgTime: dept.avgResolutionTime,
  }));

  // Calculate efficiency score (resolved / total * 100)
  const efficiencyData = departmentAnalytics.map((dept) => ({
    department: dept.department.split(' ')[0],
    efficiency: Math.round((dept.resolved / dept.totalComplaints) * 100),
  }));

  // Pie chart data for overall distribution
  const overallDistribution = [
    { name: 'Resolved', value: departmentAnalytics.reduce((acc, d) => acc + d.resolved, 0) },
    { name: 'Pending', value: departmentAnalytics.reduce((acc, d) => acc + d.pending, 0) },
    { name: 'In Progress', value: departmentAnalytics.reduce((acc, d) => acc + d.inProgress, 0) },
  ];

  // Radar chart data
  const radarData = departmentAnalytics.map((dept) => ({
    department: dept.department.split(' ')[0],
    complaints: Math.min(dept.totalComplaints / 3, 100),
    resolved: Math.min(dept.resolved / 2.5, 100),
    efficiency: (dept.resolved / dept.totalComplaints) * 100,
    speed: Math.max(0, 100 - dept.avgResolutionTime * 2),
  }));

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Department Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Detailed performance metrics across all departments
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="1month">Last Month</MenuItem>
            <MenuItem value="3months">Last 3 Months</MenuItem>
            <MenuItem value="6months">Last 6 Months</MenuItem>
            <MenuItem value="1year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {departmentAnalytics.map((dept, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dept.department}>
            <Card
              sx={{
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 4,
                  height: '100%',
                  bgcolor: COLORS[index],
                },
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {dept.department}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {dept.totalComplaints}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Complaints
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" color="success.main" fontWeight={600}>
                      {Math.round((dept.resolved / dept.totalComplaints) * 100)}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Resolution Rate
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Box>
                    <Typography variant="body2" color="success.main" fontWeight={500}>
                      {dept.resolved} Resolved
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="warning.main" fontWeight={500}>
                      {dept.pending} Pending
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="info.main" fontWeight={500}>
                      {dept.inProgress} Active
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Complaints by Department */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Complaints Distribution by Department
              </Typography>
              <Box sx={{ height: 350, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey="department"
                      stroke="#666"
                      tick={{ fontSize: 11 }}
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="resolved" name="Resolved" fill="#2e7d32" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" name="Pending" fill="#ed6c02" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="inProgress" name="In Progress" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Overall Distribution Pie */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Overall Status Distribution
              </Typography>
              <Box sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overallDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#2e7d32" />
                      <Cell fill="#ed6c02" />
                      <Cell fill="#1976d2" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Resolution Time Comparison */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Average Resolution Time (Hours)
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resolutionTimeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" stroke="#666" unit="h" />
                    <YAxis dataKey="department" type="category" stroke="#666" width={80} />
                    <Tooltip
                      formatter={(value) => [`${value} hours`, 'Avg. Time']}
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Bar dataKey="avgTime" fill="#0097a7" radius={[0, 4, 4, 0]}>
                      {resolutionTimeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.avgTime > 24 ? '#d32f2f' : entry.avgTime > 12 ? '#ed6c02' : '#2e7d32'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Efficiency Score */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Department Efficiency Score (%)
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={efficiencyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" stroke="#666" domain={[0, 100]} unit="%" />
                    <YAxis dataKey="department" type="category" stroke="#666" width={80} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Efficiency']}
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Bar dataKey="efficiency" fill="#1976d2" radius={[0, 4, 4, 0]}>
                      {efficiencyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.efficiency > 85 ? '#2e7d32' : entry.efficiency > 70 ? '#ed6c02' : '#d32f2f'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Trends */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Monthly Complaint Trends
              </Typography>
              <Box sx={{ height: 350, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="complaints"
                      name="New Complaints"
                      stroke="#1976d2"
                      strokeWidth={3}
                      dot={{ fill: '#1976d2', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      name="Resolved"
                      stroke="#2e7d32"
                      strokeWidth={3}
                      dot={{ fill: '#2e7d32', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
