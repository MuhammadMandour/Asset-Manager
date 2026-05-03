package com.assettrack;

import com.assettrack.domain.Asset;
import com.assettrack.domain.AssetCondition;
import com.assettrack.domain.AssetStatus;
import com.assettrack.domain.AssetType;
import com.assettrack.domain.Role;
import com.assettrack.domain.User;
import com.assettrack.repository.AssetRepository;
import com.assettrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AssetRepository assetRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            log.info("Seeding database...");
            
            User admin = User.builder()
                    .email("admin@assettrack.com")
                    .password(passwordEncoder.encode("Admin@1234"))
                    .fullName("Alice Admin")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);

            User manager = User.builder()
                    .email("manager@assettrack.com")
                    .password(passwordEncoder.encode("Manager@1234"))
                    .fullName("Bob Manager")
                    .role(Role.MANAGER)
                    .build();
            userRepository.save(manager);

            User dev = User.builder()
                    .email("dev@assettrack.com")
                    .password(passwordEncoder.encode("Dev@1234"))
                    .fullName("Carol Dev")
                    .role(Role.DEVELOPER)
                    .build();
            userRepository.save(dev);

            Asset laptop1 = Asset.builder()
                    .type(AssetType.LAPTOP)
                    .brand("Apple")
                    .model("MacBook Pro M2")
                    .serialNumber("SN-APL-001")
                    .purchaseDate(LocalDate.now().minusYears(1))
                    .warrantyExpirationDate(LocalDate.now().plusYears(1))
                    .status(AssetStatus.ASSIGNED)
                    .condition(AssetCondition.GOOD)
                    .currentOwner(dev)
                    .build();
            assetRepository.save(laptop1);

            Asset laptop2 = Asset.builder()
                    .type(AssetType.LAPTOP)
                    .brand("Dell")
                    .model("XPS 15")
                    .serialNumber("SN-DEL-002")
                    .purchaseDate(LocalDate.now().minusMonths(6))
                    .warrantyExpirationDate(LocalDate.now().plusMonths(6))
                    .status(AssetStatus.AVAILABLE)
                    .condition(AssetCondition.GOOD)
                    .build();
            assetRepository.save(laptop2);

            Asset monitor1 = Asset.builder()
                    .type(AssetType.MONITOR)
                    .brand("LG")
                    .model("27UL850")
                    .serialNumber("SN-LG-003")
                    .purchaseDate(LocalDate.now().minusYears(2))
                    .warrantyExpirationDate(LocalDate.now().plusDays(10)) // Expiring soon
                    .status(AssetStatus.ASSIGNED)
                    .condition(AssetCondition.FAIR)
                    .currentOwner(dev)
                    .build();
            assetRepository.save(monitor1);
            
            Asset mouse = Asset.builder()
                    .type(AssetType.ACCESSORY)
                    .brand("Logitech")
                    .model("MX Master 3")
                    .serialNumber("SN-LOG-004")
                    .purchaseDate(LocalDate.now().minusYears(3))
                    .warrantyExpirationDate(LocalDate.now().minusDays(5)) // Expired
                    .status(AssetStatus.AVAILABLE)
                    .condition(AssetCondition.POOR)
                    .build();
            assetRepository.save(mouse);

            log.info("Seeding completed.");
        }
    }
}
