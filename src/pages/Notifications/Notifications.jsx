import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Chip,
  Button,
  Divider,
  Tabs,
  Tab,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning,
  CheckCircle,
  Error,
  Info,
  Delete,
  MarkEmailRead,
  MoreVert,
  FilterList,
  Refresh,
  NotificationsOff,
  Circle,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'critical',
    title: 'Critical: Water Main Burst',
    message: 'Emergency water main burst reported at Main Street. Immediate action required.',
    timestamp: dayjs().subtract(5, 'minutes').toISOString(),
    read: false,
    category: 'complaint',
  },
  {
    id: 2,
    type: 'warning',
    title: 'High Priority Complaint Pending',
    message: '3 high-priority complaints have been pending for more than 24 hours.',
    timestamp: dayjs().subtract(30, 'minutes').toISOString(),
    read: false,
    category: 'complaint',
  },
  {
    id: 3,
    type: 'success',
    title: 'Officer Performance Update',
    message: 'Officer Raj Kumar has resolved 15 complaints this week, exceeding targets.',
    timestamp: dayjs().subtract(2, 'hours').toISOString(),
    read: false,
    category: 'performance',
  },
  {
    id: 4,
    type: 'info',
    title: 'New Officer Registered',
    message: 'Officer Priya Singh has been successfully registered in Sanitation department.',
    timestamp: dayjs().subtract(4, 'hours').toISOString(),
    read: true,
    category: 'system',
  },
  {
    id: 5,
    type: 'warning',
    title: 'AI Alert: Pattern Detected',
    message: 'Recurring pothole complaints detected in Zone B. Infrastructure inspection recommended.',
    timestamp: dayjs().subtract(6, 'hours').toISOString(),
    read: true,
    category: 'ai',
  },
  {
    id: 6,
    type: 'success',
    title: 'Weekly Report Generated',
    message: 'Department analytics report for this week has been generated successfully.',
    timestamp: dayjs().subtract(1, 'day').toISOString(),
    read: true,
    category: 'system',
  },
  {
    id: 7,
    type: 'critical',
    title: 'Power Outage Reported',
    message: 'Multiple power outage complaints in Industrial Zone. Escalated to Electricity department.',
    timestamp: dayjs().subtract(1, 'day').toISOString(),
    read: true,
    category: 'complaint',
  },
  {
    id: 8,
    type: 'info',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance window: Tonight 2:00 AM - 4:00 AM IST.',
    timestamp: dayjs().subtract(2, 'days').toISOString(),
    read: true,
    category: 'system',
  },
  {
    id: 9,
    type: 'success',
    title: 'Monthly Target Achieved',
    message: 'Water department has achieved 95% resolution rate this month.',
    timestamp: dayjs().subtract(3, 'days').toISOString(),
    read: true,
    category: 'performance',
  },
  {
    id: 10,
    type: 'warning',
    title: 'Officer Response Time Alert',
    message: 'Average response time in Traffic department exceeds 4 hours.',
    timestamp: dayjs().subtract(4, 'days').toISOString(),
    read: true,
    category: 'performance',
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    handleMenuClose();
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    handleMenuClose();
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getFilteredNotifications = () => {
    switch (tabValue) {
      case 1:
        return notifications.filter(n => !n.read);
      case 2:
        return notifications.filter(n => n.category === 'complaint');
      case 3:
        return notifications.filter(n => n.category === 'ai');
      case 4:
        return notifications.filter(n => n.category === 'system');
      default:
        return notifications;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical':
        return <Error sx={{ color: '#E74C3C' }} />;
      case 'warning':
        return <Warning sx={{ color: '#F39C12' }} />;
      case 'success':
        return <CheckCircle sx={{ color: '#2ECC71' }} />;
      case 'info':
      default:
        return <Info sx={{ color: '#3498DB' }} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'critical':
        return { bg: '#E74C3C20', color: '#E74C3C' };
      case 'warning':
        return { bg: '#F39C1220', color: '#F39C12' };
      case 'success':
        return { bg: '#2ECC7120', color: '#2ECC71' };
      case 'info':
      default:
        return { bg: '#3498DB20', color: '#3498DB' };
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NotificationsIcon sx={{ fontSize: 32, color: '#D4A73C' }} />
            <Typography variant="h4" fontWeight={700} color="#FFFFFF">
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} new`}
                size="small"
                sx={{ bgcolor: '#E74C3C', color: '#FFFFFF' }}
              />
            )}
          </Box>
          <Typography variant="body1" color="#9A9A9A" sx={{ mt: 1 }}>
            Stay updated with system alerts and activity
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<MarkEmailRead />}
            onClick={handleMarkAllAsRead}
            sx={{ color: '#D4A73C' }}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
          <Button
            startIcon={<Delete />}
            onClick={handleClearAll}
            sx={{ color: '#9A9A9A' }}
            disabled={notifications.length === 0}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#D4A73C">
                {notifications.length}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#3498DB">
                {unreadCount}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                Unread
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#E74C3C">
                {notifications.filter(n => n.type === 'critical').length}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                Critical
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#F39C12">
                {notifications.filter(n => n.type === 'warning').length}
              </Typography>
              <Typography variant="caption" color="#9A9A9A">
                Warnings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
        <Box sx={{ borderBottom: 1, borderColor: '#2A2A2A' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { color: '#9A9A9A' },
              '& .Mui-selected': { color: '#D4A73C' },
              '& .MuiTabs-indicator': { backgroundColor: '#D4A73C' },
            }}
          >
            <Tab label="All" />
            <Tab 
              label={
                <Badge badgeContent={unreadCount} color="error">
                  <span>Unread</span>
                </Badge>
              } 
            />
            <Tab label="Complaints" />
            <Tab label="AI Alerts" />
            <Tab label="System" />
          </Tabs>
        </Box>

        <CardContent sx={{ p: 0 }}>
          {filteredNotifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <NotificationsOff sx={{ fontSize: 64, color: '#2A2A2A', mb: 2 }} />
              <Typography variant="h6" color="#9A9A9A">
                No notifications
              </Typography>
              <Typography variant="body2" color="#9A9A9A">
                You're all caught up!
              </Typography>
            </Box>
          ) : (
            <Box>
              {filteredNotifications.map((notification, index) => {
                const colors = getTypeColor(notification.type);
                return (
                  <Box key={notification.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        p: 3,
                        bgcolor: notification.read ? 'transparent' : '#1E1E1E',
                        '&:hover': { bgcolor: '#1E1E1E' },
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      {/* Unread indicator */}
                      {!notification.read && (
                        <Circle
                          sx={{
                            position: 'absolute',
                            left: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: 8,
                            color: '#D4A73C',
                          }}
                        />
                      )}

                      {/* Icon */}
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          bgcolor: colors.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {getTypeIcon(notification.type)}
                      </Box>

                      {/* Content */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography
                            variant="subtitle2"
                            fontWeight={notification.read ? 500 : 700}
                            color="#FFFFFF"
                            noWrap
                          >
                            {notification.title}
                          </Typography>
                          <Chip
                            label={notification.category}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: 10,
                              bgcolor: '#2A2A2A',
                              color: '#9A9A9A',
                              textTransform: 'capitalize',
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          color="#9A9A9A"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="#D4A73C" sx={{ mt: 1, display: 'block' }}>
                          {dayjs(notification.timestamp).fromNow()}
                        </Typography>
                      </Box>

                      {/* Actions */}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, notification);
                        }}
                        sx={{ color: '#9A9A9A' }}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                    {index < filteredNotifications.length - 1 && (
                      <Divider sx={{ borderColor: '#2A2A2A' }} />
                    )}
                  </Box>
                );
              })}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedNotification && !selectedNotification.read && (
          <MenuItem onClick={() => handleMarkAsRead(selectedNotification.id)}>
            <ListItemIcon>
              <MarkEmailRead fontSize="small" />
            </ListItemIcon>
            Mark as Read
          </MenuItem>
        )}
        <MenuItem onClick={() => handleDelete(selectedNotification?.id)}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Notifications;
