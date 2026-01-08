import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Warning,
  CheckCircle,
  Error,
  Lightbulb,
  Psychology,
  LocationOn,
} from '@mui/icons-material';
import { aiInsights } from '../../data/mockData';

const AIInsights = () => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'recurring':
        return <Warning sx={{ fontSize: 28 }} />;
      case 'pattern':
        return <Psychology sx={{ fontSize: 28 }} />;
      case 'risk':
        return <Error sx={{ fontSize: 28 }} />;
      case 'improvement':
        return <CheckCircle sx={{ fontSize: 28 }} />;
      case 'prediction':
        return <Lightbulb sx={{ fontSize: 28 }} />;
      default:
        return <Psychology sx={{ fontSize: 28 }} />;
    }
  };

  const getInsightColor = (severity) => {
    switch (severity) {
      case 'critical':
        return { bg: '#ffebee', color: '#d32f2f', border: '#ffcdd2' };
      case 'high':
        return { bg: '#fff3e0', color: '#e65100', border: '#ffe0b2' };
      case 'medium':
        return { bg: '#e3f2fd', color: '#1565c0', border: '#bbdefb' };
      case 'positive':
        return { bg: '#e8f5e9', color: '#2e7d32', border: '#c8e6c9' };
      case 'warning':
        return { bg: '#fffde7', color: '#f9a825', border: '#fff9c4' };
      default:
        return { bg: '#f5f5f5', color: '#757575', border: '#e0e0e0' };
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp sx={{ color: 'error.main' }} />;
      case 'decreasing':
        return <TrendingDown sx={{ color: 'success.main' }} />;
      case 'stable':
        return <TrendingFlat sx={{ color: 'info.main' }} />;
      default:
        return null;
    }
  };

  // Mock hotspot data
  const hotspots = [
    { area: 'Main Street Intersection', complaints: 28, type: 'Potholes', risk: 85 },
    { area: 'Westside Water Main', complaints: 15, type: 'Water Leakage', risk: 72 },
    { area: 'Industrial Zone Grid', complaints: 12, type: 'Power Issues', risk: 68 },
    { area: 'Central Park Area', complaints: 8, type: 'Sanitation', risk: 45 },
    { area: 'Downtown Traffic Hub', complaints: 22, type: 'Signals', risk: 78 },
  ];

  // Mock predictions
  const predictions = [
    {
      title: 'Monsoon Season Alert',
      description: 'Expected 40% increase in drainage and road complaints in next 2 weeks',
      confidence: 89,
    },
    {
      title: 'Infrastructure Aging',
      description: 'Zone C power grid may face outages within 30 days',
      confidence: 76,
    },
    {
      title: 'Peak Load Period',
      description: 'Water supply complaints may surge during summer peak',
      confidence: 82,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Psychology sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight={700}>
            AI Insights
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          AI-powered analysis of city infrastructure patterns and predictions
        </Typography>
      </Box>

      {/* Main Insights */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {aiInsights.map((insight) => {
          const colors = getInsightColor(insight.severity);
          return (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={insight.id}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: colors.bg,
                  border: '1px solid',
                  borderColor: colors.border,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.color,
                      }}
                    >
                      {getInsightIcon(insight.type)}
                    </Box>
                    {getTrendIcon(insight.trend)}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ color: colors.color, mb: 1 }}>
                    {insight.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {insight.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      icon={<LocationOn sx={{ fontSize: 14 }} />}
                      label={insight.area}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={insight.severity}
                      size="small"
                      sx={{
                        bgcolor: colors.color,
                        color: 'white',
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Hotspots and Predictions */}
      <Grid container spacing={3}>
        {/* Problem Hotspots */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🔥 Problem Hotspots
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Areas with recurring complaints identified by AI analysis
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {hotspots.map((spot, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {spot.area}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {spot.complaints} complaints • {spot.type}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${spot.risk}% Risk`}
                        size="small"
                        color={spot.risk > 70 ? 'error' : spot.risk > 50 ? 'warning' : 'success'}
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={spot.risk}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: spot.risk > 70 ? 'error.main' : spot.risk > 50 ? 'warning.main' : 'success.main',
                        },
                      }}
                    />
                    {index < hotspots.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Predictive Alerts */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🔮 Predictive Alerts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                AI-generated predictions for potential issues
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {predictions.map((pred, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'grey.50',
                      border: '1px solid',
                      borderColor: 'grey.200',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {pred.title}
                      </Typography>
                      <Chip
                        label={`${pred.confidence}% confident`}
                        size="small"
                        color={pred.confidence > 80 ? 'error' : 'warning'}
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {pred.description}
                    </Typography>
                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                        Confidence Level
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={pred.confidence}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          bgcolor: 'grey.300',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: pred.confidence > 80 ? 'error.main' : 'warning.main',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Trend Summary */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            📊 AI Summary
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'error.50', borderRadius: 2 }}>
                <Typography variant="h3" fontWeight={700} color="error.main">
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Critical Hotspots
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 2 }}>
                <Typography variant="h3" fontWeight={700} color="warning.main">
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recurring Patterns
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.50', borderRadius: 2 }}>
                <Typography variant="h3" fontWeight={700} color="info.main">
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Predictions
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                <Typography variant="h3" fontWeight={700} color="success.main">
                  87%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prediction Accuracy
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AIInsights;
