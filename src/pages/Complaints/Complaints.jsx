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
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Close,
  LocationOn,
  Person,
  Phone,
  CalendarToday,
  Schedule,
  Refresh,
} from '@mui/icons-material';
import { complaints as initialComplaints, departments, areas } from '../../data/mockData';
import dayjs from 'dayjs';

const Complaints = () => {
  const [complaints] = useState(initialComplaints);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterArea, setFilterArea] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Filter complaints
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.citizenName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || complaint.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    const matchesArea = filterArea === 'all' || complaint.area === filterArea;
    return matchesSearch && matchesDepartment && matchesStatus && matchesPriority && matchesArea;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedComplaint(null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilterDepartment('all');
    setFilterStatus('all');
    setFilterPriority('all');
    setFilterArea('all');
  };

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

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MMM DD, YYYY hh:mm A');
  };

  // Stats
  const stats = {
    total: complaints.length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
    inProgress: complaints.filter((c) => c.status === 'in-progress').length,
    pending: complaints.filter((c) => c.status === 'pending').length,
    critical: complaints.filter((c) => c.priority === 'critical').length,
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="#FFFFFF">
          Complaint Monitoring
        </Typography>
        <Typography variant="body1" color="#9A9A9A">
          Track and manage all city-wide complaints
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#D4A73C">
                {stats.total}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#2ECC71">
                {stats.resolved}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#3498DB">
                {stats.inProgress}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#F39C12">
                {stats.pending}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#E74C3C">
                {stats.critical}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                Critical
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <FormControl fullWidth size="small">
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
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filterPriority}
                  label="Priority"
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <MenuItem value="all">All Priority</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Area</InputLabel>
                <Select
                  value={filterArea}
                  label="Area"
                  onChange={(e) => setFilterArea(e.target.value)}
                >
                  <MenuItem value="all">All Areas</MenuItem>
                  {areas.map((area) => (
                    <MenuItem key={area.id} value={area.name}>
                      {area.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <Button fullWidth variant="outlined" startIcon={<Refresh />} onClick={resetFilters}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Complaint ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComplaints
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((complaint) => (
                  <TableRow key={complaint.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {complaint.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {complaint.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.department}
                        size="small"
                        sx={{
                          bgcolor:
                            departments.find((d) => d.name === complaint.department)?.color + '20',
                          color: departments.find((d) => d.name === complaint.department)?.color,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{complaint.area}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.priority}
                        size="small"
                        color={getPriorityColor(complaint.priority)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status.replace('-', ' ')}
                        size="small"
                        color={getStatusColor(complaint.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {formatDate(complaint.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {complaint.assignedOfficer || 'Unassigned'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleViewDetails(complaint)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredComplaints.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No complaints found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search or filters
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredComplaints.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Complaint Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedComplaint && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{selectedComplaint.id}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedComplaint.title}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                {/* Left Column - Details */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Complaint Details
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {selectedComplaint.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip
                        label={selectedComplaint.priority}
                        color={getPriorityColor(selectedComplaint.priority)}
                        size="small"
                      />
                      <Chip
                        label={selectedComplaint.status.replace('-', ' ')}
                        color={getStatusColor(selectedComplaint.status)}
                        size="small"
                      />
                      <Chip label={selectedComplaint.department} size="small" variant="outlined" />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Citizen Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2">{selectedComplaint.citizenName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2">{selectedComplaint.citizenPhone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2">{selectedComplaint.area}</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Timeline
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Created: {formatDate(selectedComplaint.createdAt)}
                      </Typography>
                    </Box>
                    {selectedComplaint.resolvedAt && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Schedule sx={{ fontSize: 18, color: 'success.main' }} />
                        <Typography variant="body2" color="success.main">
                          Resolved: {formatDate(selectedComplaint.resolvedAt)}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Assigned: {selectedComplaint.assignedOfficer || 'Not assigned'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Right Column - Images */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Before Image
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 180,
                      borderRadius: 2,
                      overflow: 'hidden',
                      bgcolor: '#1E1E1E',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {selectedComplaint.beforeImage ? (
                      <img
                        src={selectedComplaint.beforeImage}
                        alt="Before"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No image available
                      </Typography>
                    )}
                  </Box>

                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    After Image
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 180,
                      borderRadius: 2,
                      overflow: 'hidden',
                      bgcolor: '#1E1E1E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {selectedComplaint.afterImage ? (
                      <img
                        src={selectedComplaint.afterImage}
                        alt="After"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {selectedComplaint.status === 'resolved'
                          ? 'No image uploaded'
                          : 'Pending resolution'}
                      </Typography>
                    )}
                  </Box>

                  {/* Map Placeholder */}
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                    Location
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 120,
                      borderRadius: 2,
                      bgcolor: '#1E1E1E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed',
                      borderColor: '#2A2A2A',
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <LocationOn sx={{ fontSize: 32, color: '#9A9A9A' }} />
                      <Typography variant="caption" color="#9A9A9A" display="block">
                        Map View Placeholder
                      </Typography>
                      <Typography variant="caption" color="#9A9A9A">
                        Lat: {selectedComplaint.location?.lat}, Lng: {selectedComplaint.location?.lng}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog} sx={{ color: '#9A9A9A' }}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Complaints;
