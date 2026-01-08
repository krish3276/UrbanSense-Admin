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

const COLORS = ['#D4A73C', '#2ECC71', '#F39C12', '#E74C3C', '#3498DB', '#9B59B6'];

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
          <Typography variant="h4" fontWeight={700} gutterBottom color="#FFFFFF">
            Department Analytics
          </Typography>
          <Typography variant="body1" color="#9A9A9A">
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
                <Typography variant="subtitle2" color="#9A9A9A" gutterBottom>
                  {dept.department}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="h4" fontWeight={700} color="#FFFFFF">
                      {dept.totalComplaints}
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Total Complaints
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" color="#2ECC71" fontWeight={600}>
                      {Math.round((dept.resolved / dept.totalComplaints) * 100)}%
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Resolution Rate
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Box>
                    <Typography variant="body2" color="#2ECC71" fontWeight={500}>
                      {dept.resolved} Resolved
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="#F39C12" fontWeight={500}>
                      {dept.pending} Pending
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="#3498DB" fontWeight={500}>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis
                      dataKey="department"
                      stroke="#9A9A9A"
                      tick={{ fontSize: 11 }}
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis stroke="#9A9A9A" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        backgroundColor: '#1E1E1E',
                        color: '#FFFFFF',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="resolved" name="Resolved" fill="#2ECC71" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" name="Pending" fill="#F39C12" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="inProgress" name="In Progress" fill="#3498DB" radius={[4, 4, 0, 0]} />
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
                      <Cell fill="#2ECC71" />
                      <Cell fill="#F39C12" />
                      <Cell fill="#3498DB" />
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis type="number" stroke="#9A9A9A" unit="h" />
                    <YAxis dataKey="department" type="category" stroke="#9A9A9A" width={80} />
                    <Tooltip
                      formatter={(value) => [`${value} hours`, 'Avg. Time']}
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        backgroundColor: '#1E1E1E',
                        color: '#FFFFFF',
                      }}
                    />
                    <Bar dataKey="avgTime" fill="#3498DB" radius={[0, 4, 4, 0]}>
                      {resolutionTimeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.avgTime > 24 ? '#E74C3C' : entry.avgTime > 12 ? '#F39C12' : '#2ECC71'}
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis type="number" stroke="#9A9A9A" domain={[0, 100]} unit="%" />
                    <YAxis dataKey="department" type="category" stroke="#9A9A9A" width={80} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Efficiency']}
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        backgroundColor: '#1E1E1E',
                        color: '#FFFFFF',
                      }}
                    />
                    <Bar dataKey="efficiency" fill="#D4A73C" radius={[0, 4, 4, 0]}>
                      {efficiencyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.efficiency > 85 ? '#2ECC71' : entry.efficiency > 70 ? '#F39C12' : '#E74C3C'}
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="month" stroke="#9A9A9A" />
                    <YAxis stroke="#9A9A9A" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        backgroundColor: '#1E1E1E',
                        color: '#FFFFFF',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="complaints"
                      name="New Complaints"
                      stroke="#D4A73C"
                      strokeWidth={3}
                      dot={{ fill: '#D4A73C', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      name="Resolved"
                      stroke="#2ECC71"
                      strokeWidth={3}
                      dot={{ fill: '#2ECC71', strokeWidth: 2, r: 5 }}
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
