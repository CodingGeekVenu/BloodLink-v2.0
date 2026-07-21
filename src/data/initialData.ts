import { DonorProfile, BloodRequest, SystemAlert, ActivityItem, KotlinCodeFile } from '../types';

export const INITIAL_DONORS: DonorProfile[] = [
  {
    id: 'd1',
    name: 'Rajesh Kumar',
    initials: 'R.K.',
    phone: '+91 98765 43210',
    bloodGroup: 'O+',
    age: 28,
    area: 'Kurnool Sector 4',
    lastDonationDate: '2024-01-12',
    isAvailable: true,
    distanceKm: 2.5,
    isVerified: true,
    consent: true,
  },
  {
    id: 'd2',
    name: 'Suresh Mittal',
    initials: 'S.M.',
    phone: '+91 98123 45678',
    bloodGroup: 'O+',
    age: 34,
    area: 'Nandyal Road',
    lastDonationDate: '2024-07-02',
    isAvailable: false,
    distanceKm: 4.1,
    isVerified: true,
    consent: true,
  },
  {
    id: 'd3',
    name: 'Anil Joseph',
    initials: 'A.J.',
    phone: '+91 99887 76655',
    bloodGroup: 'O+',
    age: 29,
    area: 'Old Bus Stand Area',
    lastDonationDate: '2023-11-20',
    isAvailable: true,
    distanceKm: 5.8,
    isVerified: false,
    consent: true,
  },
  {
    id: 'd4',
    name: 'Priya Sharma',
    initials: 'P.S.',
    phone: '+91 97654 32109',
    bloodGroup: 'B+',
    age: 25,
    area: 'Collectorate Colony',
    lastDonationDate: '2024-02-18',
    isAvailable: true,
    distanceKm: 1.8,
    isVerified: true,
    consent: true,
  },
  {
    id: 'd5',
    name: 'Mohd Vakeel',
    initials: 'M.V.',
    phone: '+91 96543 21098',
    bloodGroup: 'A-',
    age: 31,
    area: 'Checkpost Junction',
    lastDonationDate: '2023-09-05',
    isAvailable: true,
    distanceKm: 3.2,
    isVerified: true,
    consent: true,
  },
];

export const INITIAL_REQUESTS: BloodRequest[] = [
  {
    id: 'BL902',
    patientName: 'Ramesh Verma',
    bloodGroup: 'O+',
    unitsRequired: 2,
    urgency: 'high',
    hospitalName: 'Rural Health Center, Block C',
    locationWard: 'Ward 4, Bed 12',
    requiredByTime: '14:30',
    doctorHwVerified: true,
    hwId: 'BL-4902',
    status: 'accepted',
    createdAt: '09:42 AM',
    acceptedDonorId: 'd1',
    acceptedDonorName: 'Rajesh Kumar (R.K.)',
    acceptedDonorPhone: '+91 98765 43210',
  },
  {
    id: 'BL903',
    patientName: 'Sunita Devi',
    bloodGroup: 'B+',
    unitsRequired: 1,
    urgency: 'critical',
    hospitalName: 'District Government Hospital',
    locationWard: 'ICU Ward 2',
    requiredByTime: '12:00',
    doctorHwVerified: true,
    hwId: 'BL-1022',
    status: 'notified',
    createdAt: '10:15 AM',
  },
  {
    id: 'BL904',
    patientName: 'Karthik Rao',
    bloodGroup: 'O-',
    unitsRequired: 3,
    urgency: 'critical',
    hospitalName: 'City Care Hospital',
    locationWard: 'Emergency Trauma Ward',
    requiredByTime: '11:00',
    doctorHwVerified: false,
    status: 'created',
    createdAt: '11:05 AM',
  },
];

export const INITIAL_ALERTS: SystemAlert[] = [
  {
    id: 'a1',
    type: 'warning',
    title: 'Low Stock: O Negative',
    description: 'District 4 reserves are below 10%. Immediate mobilization recommended.',
    timestamp: '2 hours ago',
  },
  {
    id: 'a2',
    type: 'info',
    title: 'Offline Sync Completed',
    description: 'Data from 3 rural mobile units successfully synchronized with main database.',
    timestamp: '5 hours ago',
  },
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act1',
    type: 'completed',
    title: 'Donation Completed',
    description: 'Donor #892 successfully completed A+ donation at District Hospital.',
    timeAgo: '10 mins ago',
  },
  {
    id: 'act2',
    type: 'new_donor',
    title: 'New Donor Registered',
    description: 'Rajesh Kumar (O-) added to verified donor list by Dr. Sharma.',
    timeAgo: '2 hrs ago',
  },
];

export const KOTLIN_CODE_FILES: KotlinCodeFile[] = [
  {
    id: 'k1',
    filename: 'MainActivity.kt',
    language: 'kotlin',
    description: 'Main Android Activity handling Role Navigation & Compose UI State',
    code: `package com.bloodlink.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewmodels.ViewModelProvider
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.bloodlink.app.ui.BloodLinkApp
import com.bloodlink.app.ui.theme.BloodLinkTheme
import com.bloodlink.app.viewmodel.BloodLinkViewModel

class MainActivity : ComponentActivity() {
    private lateinit var viewModel: BloodLinkViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        viewModel = ViewModelProvider(this)[BloodLinkViewModel::class.java]
        viewModel.initializeBleBroadcast(this)

        setContent {
            BloodLinkTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    BloodLinkApp(viewModel = viewModel)
                }
            }
        }
    }
}`
  },
  {
    id: 'k2',
    filename: 'BleBroadcastManager.kt',
    language: 'kotlin',
    description: 'Bluetooth Low Energy (BLE) Peer-to-Peer Nearby Emergency Broadcast Service',
    code: `package com.bloodlink.app.ble

import android.bluetooth.BluetoothAdapter
import android.bluetooth.le.AdvertiseCallback
import android.bluetooth.le.AdvertiseData
import android.bluetooth.le.AdvertiseSettings
import android.bluetooth.le.BluetoothLeAdvertiser
import android.content.Context
import android.os.ParcelUuid
import android.util.Log
import java.util.UUID

class BleBroadcastManager(private val context: Context) {
    private var advertiser: BluetoothLeAdvertiser? = null
    private var isBroadcasting = false

    companion object {
        val BLOODLINK_SERVICE_UUID: UUID = UUID.fromString("0000FE90-0000-1000-8000-00805F9B34FB")
        private const val TAG = "BleBroadcastManager"
    }

    fun startEmergencyBroadcast(bloodGroup: String, requestId: String) {
        val adapter = BluetoothAdapter.getDefaultAdapter() ?: return
        advertiser = adapter.bluetoothLeAdvertiser

        val settings = AdvertiseSettings.Builder()
            .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
            .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
            .setConnectable(true)
            .build()

        val payloadData = "$bloodGroup:$requestId".toByteArray(Charsets.UTF_8)

        val data = AdvertiseData.Builder()
            .setIncludeDeviceName(false)
            .addServiceUuid(ParcelUuid(BLOODLINK_SERVICE_UUID))
            .addServiceData(ParcelUuid(BLOODLINK_SERVICE_UUID), payloadData)
            .build()

        advertiser?.startAdvertising(settings, data, advertiseCallback)
        isBroadcasting = true
        Log.d(TAG, "Started BLE emergency broadcast for blood type: $bloodGroup")
    }

    fun stopBroadcast() {
        if (isBroadcasting) {
            advertiser?.stopAdvertising(advertiseCallback)
            isBroadcasting = false
            Log.d(TAG, "Stopped BLE broadcast")
        }
    }

    private val advertiseCallback = object : AdvertiseCallback() {
        override fun onStartSuccess(settingsInEffect: AdvertiseSettings?) {
            super.onStartSuccess(settingsInEffect)
            Log.i(TAG, "BLE Advertising started successfully")
        }

        override fun onStartFailure(errorCode: Int) {
            super.onStartFailure(errorCode)
            Log.e(TAG, "BLE Advertising failed with code: $errorCode")
        }
    }
}`
  },
  {
    id: 'k3',
    filename: 'BloodLinkRepository.kt',
    language: 'kotlin',
    description: 'Offline-First Repository with Room Local DB & Auto Cloud Sync',
    code: `package com.bloodlink.app.repository

import com.bloodlink.app.db.BloodRequestDao
import com.bloodlink.app.db.BloodRequestEntity
import com.bloodlink.app.model.BloodGroup
import com.bloodlink.app.network.BloodLinkApiService
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class BloodLinkRepository @Inject constructor(
    private val dao: BloodRequestDao,
    private val apiService: BloodLinkApiService
) {
    val allLocalRequests: Flow<List<BloodRequestEntity>> = dao.getAllRequests()

    suspend fun createEmergencyRequest(request: BloodRequestEntity) {
        // Save locally first for 100% offline reliability
        dao.insertRequest(request.copy(isPendingSync = true))

        try {
            val response = apiService.postEmergencyRequest(request.toNetworkModel())
            if (response.isSuccessful) {
                dao.updateSyncStatus(request.id, isPendingSync = false)
            }
        } catch (e: Exception) {
            // Retain local copy for retry sync when internet is restored
            Log.w("BloodLinkRepository", "Offline mode active. Saved locally: \${request.id}")
        }
    }

    suspend fun syncPendingRequests() {
        val pending = dao.getPendingSyncRequests()
        for (req in pending) {
            try {
                val res = apiService.postEmergencyRequest(req.toNetworkModel())
                if (res.isSuccessful) {
                    dao.updateSyncStatus(req.id, isPendingSync = false)
                }
            } catch (ignored: Exception) {}
        }
    }
}`
  },
  {
    id: 'k4',
    filename: 'JetpackComposeUI.kt',
    language: 'kotlin',
    description: 'Material Design 3 Jetpack Compose UI Screens for Donor & Health Worker',
    code: `package com.bloodlink.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun EmergencyRequestCard(
    bloodGroup: String,
    units: Int,
    hospitalName: String,
    urgency: String,
    onConfirmArrival: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFFFF0F0))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = "Patient Blood Group: $bloodGroup",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFFAF101A)
                )
                Surface(
                    color = Color(0xFFD32F2F),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = urgency.uppercase(),
                        color = Color.White,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = "Hospital: $hospitalName", fontSize = 14.sp)
            Text(text = "Units Required: $units", fontSize = 14.sp)
            
            Spacer(modifier = Modifier.height(16.dp))
            Button(
                onClick = onConfirmArrival,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFAF101A)),
                modifier = Modifier.fillMaxWidth().height(48.dp)
            ) {
                Text(text = "CONFIRM DONOR ARRIVAL", color = Color.White, fontWeight = FontWeight.Bold)
            }
        }
    }
}`
  }
];
