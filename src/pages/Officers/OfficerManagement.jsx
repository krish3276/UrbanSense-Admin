import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Avatar,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Alert,
  Snackbar,
  Tooltip,
  Rating,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  MoreVert,
  FilterList,
  Phone,
  Email,
  Badge,
  Block,
  CheckCircle,
  Refresh,
} from '@mui/icons-material';
import { officers as initialOfficers, departments, areas } from '../../data/mockData';

const OfficerManagement = () => {
  const [officers, setOfficers] = useState(initialOfficers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    department: '',
    area: '',
    status: 'active',
  });

  const [formErrors, setFormErrors] = useState({});

  // Filter officers
  const filteredOfficers = officers.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.mobile.includes(searchQuery) ||
      officer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || officer.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || officer.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, officer) => {
    setAnchorEl(event.currentTarget);
    setSelectedOfficer(officer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = (mode, officer = null) => {
    setDialogMode(mode);
    if (mode === 'edit' && officer) {
      setFormData({
        name: officer.name,
        mobile: officer.mobile,
        email: officer.email,
        department: officer.department,
        area: officer.area,
        status: officer.status,
      });
      setSelectedOfficer(officer);
    } else {
      setFormData({
        name: '',
        mobile: '',
        email: '',
        department: '',
        area: '',
        status: 'active',
      });
    }
    setFormErrors({});
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOfficer(null);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.mobile)) {
      errors.mobile = 'Invalid mobile number format';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.area) errors.area = 'Area is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (dialogMode === 'add') {
      const newOfficer = {
        id: officers.length + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        resolvedComplaints: 0,
        avgResponseTime: 0,
        feedbackScore: 0,
      };
      setOfficers([newOfficer, ...officers]);
      setSnackbar({
        open: true,
        message: 'Officer registered successfully!',
        severity: 'success',
      });
    } else {
      setOfficers(
        officers.map((o) =>
          o.id === selectedOfficer.id ? { ...o, ...formData } : o
        )
      );
      setSnackbar({
        open: true,
        message: 'Officer updated successfully!',
        severity: 'success',
      });
    }
    handleCloseDialog();
  };

  const handleToggleStatus = (officer) => {
    const newStatus = officer.status === 'active' ? 'inactive' : 'active';
    setOfficers(
      officers.map((o) =>
        o.id === officer.id ? { ...o, status: newStatus } : o
      )
    );
    setSnackbar({
      open: true,
      message: `Officer ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`,
      severity: 'success',
    });
    handleMenuClose();
  };

  const handleDelete = (officer) => {
    setOfficers(officers.filter((o) => o.id !== officer.id));
    setSnackbar({
      open: true,
      message: 'Officer removed successfully!',
      severity: 'success',
    });
    handleMenuClose();
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom color="#FFFFFF">
            Officer Management
          </Typography>
          <Typography variant="body1" color="#9A9A9A">
            Register and manage field officers for complaint resolution
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog('add')}
          sx={{
            background: 'linear-gradient(135deg, #D4A73C 0%, #B8963B 100%)',
            color: '#0B0B0B',
            px: 3,
            py: 1.5,
            '&:hover': {
              background: 'linear-gradient(135deg, #E4C06C 0%, #D4A73C 100%)',
            },
          }}
        >
          Register Officer
        </Button>
      </Box>

      {/* Stats Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} color="primary.main">
                {officers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Officers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} color="success.main">
                {officers.filter((o) => o.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Officers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} color="warning.main">
                {officers.filter((o) => o.status === 'inactive').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inactive Officers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Search by name, mobile, or email..."
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => {
                  setSearchQuery('');
                  setFilterDepartment('all');
                  setFilterStatus('all');
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Officers Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Officer</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Area / Zone</TableCell>
                <TableCell align="center">Resolved</TableCell>
                <TableCell align="center">Avg. Time</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOfficers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((officer) => (
                  <TableRow key={officer.id} hover>
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
                            ID: OFF-{String(officer.id).padStart(4, '0')}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2">{officer.mobile}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {officer.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={officer.department}
                        size="small"
                        sx={{
                          bgcolor: departments.find((d) => d.name === officer.department)?.color + '20',
                          color: departments.find((d) => d.name === officer.department)?.color,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>{officer.area}</TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600}>
                        {officer.resolvedComplaints}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{officer.avgResponseTime}h</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={officer.feedbackScore} precision={0.1} size="small" readOnly />
                        <Typography variant="caption">({officer.feedbackScore})</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={officer.status}
                        size="small"
                        color={officer.status === 'active' ? 'success' : 'default'}
                        icon={officer.status === 'active' ? <CheckCircle /> : <Block />}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, officer)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredOfficers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No officers found
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
          count={filteredOfficers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleOpenDialog('edit', selectedOfficer)}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit Details
        </MenuItem>
        <MenuItem onClick={() => handleToggleStatus(selectedOfficer)}>
          {selectedOfficer?.status === 'active' ? (
            <>
              <Block fontSize="small" sx={{ mr: 1 }} />
              Deactivate
            </>
          ) : (
            <>
              <CheckCircle fontSize="small" sx={{ mr: 1 }} />
              Activate
            </>
          )}
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedOfficer)} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Remove
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge color="primary" />
            {dialogMode === 'add' ? 'Register New Officer' : 'Edit Officer Details'}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  error={!!formErrors.mobile}
                  helperText={formErrors.mobile || 'Used for mobile app authentication'}
                  required
                  placeholder="+1-555-0100"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth error={!!formErrors.department} required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={formData.department}
                    label="Department"
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth error={!!formErrors.area} required>
                  <InputLabel>Area / Zone</InputLabel>
                  <Select
                    value={formData.area}
                    label="Area / Zone"
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  >
                    {areas.map((area) => (
                      <MenuItem key={area.id} value={area.name}>
                        {area.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {dialogMode === 'edit' && (
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      label="Status"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
            {dialogMode === 'add' && (
              <Alert severity="info" sx={{ mt: 3 }}>
                The registered mobile number will be used by the UrbanSense mobile app for officer role detection and authentication.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#9A9A9A' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background: 'linear-gradient(135deg, #D4A73C 0%, #B8963B 100%)',
              color: '#0B0B0B',
              '&:hover': {
                background: 'linear-gradient(135deg, #E4C06C 0%, #D4A73C 100%)',
              },
            }}
          >
            {dialogMode === 'add' ? 'Register Officer' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OfficerManagement;
