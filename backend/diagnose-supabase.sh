#!/bin/bash

echo "🔍 Supabase Connection Diagnostics"
echo "================================="
echo

# Test basic connectivity
echo "1. Testing basic internet connectivity..."
if ping -c 1 8.8.8.8 &> /dev/null; then
    echo "✅ Basic internet connectivity: OK"
else
    echo "❌ Basic internet connectivity: FAILED"
    exit 1
fi

# Test HTTP
echo
echo "2. Testing HTTP connectivity..."
if timeout 10s curl -s http://httpbin.org/get &> /dev/null; then
    echo "✅ HTTP connectivity: OK"
else
    echo "❌ HTTP connectivity: FAILED"
fi

# Test HTTPS
echo
echo "3. Testing HTTPS connectivity..."
if timeout 10s curl -s https://httpbin.org/get &> /dev/null; then
    echo "✅ HTTPS connectivity: OK"
else
    echo "❌ HTTPS connectivity: FAILED (This is likely the issue)"
    echo "   This suggests a firewall or proxy is blocking HTTPS traffic"
fi

# Test DNS resolution for Supabase
echo
echo "4. Testing DNS resolution for Supabase..."
SUPABASE_IP=$(nslookup nyzxxlutzblcbzaqalvo.supabase.co 2>/dev/null | grep "Address:" | tail -1 | cut -d' ' -f2)
if [ ! -z "$SUPABASE_IP" ]; then
    echo "✅ DNS resolution: OK (IP: $SUPABASE_IP)"
else
    echo "❌ DNS resolution: FAILED"
fi

# Test specific Supabase connectivity
echo
echo "5. Testing Supabase connectivity..."
if timeout 10s curl -s "https://nyzxxlutzblcbzaqalvo.supabase.co/rest/v1/" \
   -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55enh4bHV0emJsY2J6YXFhbHZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjgyMDI2NCwiZXhwIjoyMDY4Mzk2MjY0fQ.i-Oj9G7MzYeVQzWPjnt1IYsBethVEYdRhAKkqb6Fyzs" &> /dev/null; then
    echo "✅ Supabase connectivity: OK"
else
    echo "❌ Supabase connectivity: FAILED"
fi

echo
echo "🔧 Diagnostic Summary:"
echo "======================"
echo "If HTTPS connectivity failed, this environment likely has:"
echo "- Corporate firewall blocking HTTPS"
echo "- Proxy server requiring configuration"
echo "- SSL/TLS inspection blocking the connection"
echo
echo "💡 Recommended solutions:"
echo "1. Use DATABASE_TYPE=lowdb for development in this environment"
echo "2. Configure proxy settings if available"
echo "3. Use a different environment with unrestricted internet access"
echo "4. Contact your network administrator about HTTPS access"
echo
echo "🚀 To switch to local file-based storage:"
echo "   Edit backend/.env and change: DATABASE_TYPE=lowdb"
