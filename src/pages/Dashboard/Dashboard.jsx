import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ReportProblem,
  CheckCircle,
  Warning,
  Timer,
  ThumbUp,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import StatCard from '../../components/Common/StatCard';
import {
  dashboardStats,
  weeklyTrends,
  departmentAnalytics,
  complaints,
} from '../../data/mockData';

const COLORS = ['#D4A73C', '#2ECC71', '#F39C12', '#E74C3C', '#B8963B', '#3498DB'];

const Dashboard = () => {
  const statusData = [
    { name: 'Resolved', value: dashboardStats.resolvedComplaints, color: '#2ECC71' },
    { name: 'Active', value: dashboardStats.activeComplaints, color: '#3498DB' },
    { name: 'Critical', value: dashboardStats.criticalIssues, color: '#E74C3C' },
  ];

  const recentComplaints = complaints.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'success';
      case 'in-progress':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="#FFFFFF">
          City Overview
        </Typography>
        <Typography variant="body1" color="#9A9A9A">
          Real-time monitoring of city infrastructure and complaints
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Complaints Today"
            value={dashboardStats.totalComplaintsToday}
            icon={<ReportProblem sx={{ fontSize: 28 }} />}
            color="#D4A73C"
            trend={{ positive: false, value: '12%', label: 'vs yesterday' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Complaints"
            value={dashboardStats.activeComplaints}
            icon={<TrendingUp sx={{ fontSize: 28 }} />}
            color="#F39C12"
            subtitle="Requires attention"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Resolved This Month"
            value={dashboardStats.resolvedComplaints}
            icon={<CheckCircle sx={{ fontSize: 28 }} />}
            color="#2ECC71"
            trend={{ positive: true, value: '18%', label: 'vs last month' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Critical Issues"
            value={dashboardStats.criticalIssues}
            icon={<Warning sx={{ fontSize: 28 }} />}
            color="#E74C3C"
            subtitle="Immediate action needed"
          />
        </Grid>
      </Grid>

      {/* Second Row Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Avg. Resolution Time"
            value={`${dashboardStats.avgResolutionTime}h`}
            icon={<Timer sx={{ fontSize: 28 }} />}
            color="#3498DB"
            trend={{ positive: true, value: '8%', label: 'improvement' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Officers"
            value={dashboardStats.totalOfficers}
            icon={<People sx={{ fontSize: 28 }} />}
            color="#B8963B"
            subtitle={`${dashboardStats.activeOfficers} currently active`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Officers"
            value={dashboardStats.activeOfficers}
            icon={<TrendingUp sx={{ fontSize: 28 }} />}
            color="#2ECC71"
            subtitle="On duty today"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Citizen Satisfaction"
            value={`${dashboardStats.citizenSatisfaction}/5`}
            icon={<ThumbUp sx={{ fontSize: 28 }} />}
            color="#D4A73C"
            trend={{ positive: true, value: '0.3', label: 'improvement' }}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Weekly Trends */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Weekly Complaint Trends
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyTrends}>
                    <defs>
                      <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4A73C" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#D4A73C" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2ECC71" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="day" stroke="#9A9A9A" />
                    <YAxis stroke="#9A9A9A" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #2A2A2A',
                        backgroundColor: '#1E1E1E',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="complaints"
                      stroke="#D4A73C"
                      fillOpacity={1}
                      fill="url(#colorComplaints)"
                      strokeWidth={2}
                      name="New Complaints"
                    />
                    <Area
                      type="monotone"
                      dataKey="resolved"
                      stroke="#2ECC71"
                      fillOpacity={1}
                      fill="url(#colorResolved)"
                      strokeWidth={2}
                      name="Resolved"
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Distribution */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Complaint Status
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #2A2A2A',
                        backgroundColor: '#1E1E1E',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Department Analytics & Recent Complaints */}
      <Grid container spacing={3}>
        {/* Department Bar Chart */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Complaints by Department
              </Typography>
              <Box sx={{ height: 350, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentAnalytics}
                    layout="vertical"
                    margin={{ left: 120 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis type="number" stroke="#9A9A9A" />
                    <YAxis
                      dataKey="department"
                      type="category"
                      stroke="#9A9A9A"
                      width={110}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #2A2A2A',
                        backgroundColor: '#1E1E1E',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      }}
                    />
                    <Bar dataKey="resolved" name="Resolved" fill="#2ECC71" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="pending" name="Pending" fill="#F39C12" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="inProgress" name="In Progress" fill="#3498DB" radius={[0, 4, 4, 0]} />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Complaints */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Complaints
              </Typography>
              <Box sx={{ mt: 2 }}>
                {recentComplaints.map((complaint) => (
                  <Box
                    key={complaint.id}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      borderRadius: 2,
                      bgcolor: '#1E1E1E',
                      border: '1px solid #2A2A2A',
                      '&:hover': { bgcolor: '#252525', borderColor: '#D4A73C' },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600} color="#D4A73C">
                        {complaint.id}
                      </Typography>
                      <Chip
                        label={complaint.status.replace('-', ' ')}
                        size="small"
                        color={getStatusColor(complaint.status)}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                      {complaint.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label={complaint.priority}
                        size="small"
                        variant="outlined"
                        color={getPriorityColor(complaint.priority)}
                      />
                      <Chip label={complaint.department} size="small" variant="outlined" />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
