// Test Twilio SMS functionality

const testTwilioSMS = async () => {
  try {
    // Test with a placeholder phone number (replace with a real number for actual testing)
    const testPhoneNumber = '12345678'; // Replace with your test phone number
    
    console.log('Testing OTP request...');
    const response = await fetch('http://localhost:3000/api/auth/request-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: testPhoneNumber
      })
    });

    const result = await response.json();
    console.log('Response:', result);

    if (result.success) {
      console.log('✅ Twilio integration working! SMS should be sent to:', testPhoneNumber);
      console.log('📱 Check your phone for the OTP message');
    } else {
      console.log('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Uncomment the line below and replace the phone number to test
testTwilioSMS();

console.log('📝 To test Twilio SMS:');
console.log('1. Replace the testPhoneNumber with your actual phone number');
console.log('2. Uncomment the testTwilioSMS() call');
console.log('3. Run: node test-twilio.js');
console.log('4. Check your phone for the SMS');