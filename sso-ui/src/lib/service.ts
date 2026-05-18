import fs from "fs"; // Pastikan import fs ada di paling atas file
import { createClientFor } from "@zitadel/client";
import { IdentityProviderService } from "@zitadel/proto/zitadel/idp/v2/idp_service_pb";
import { OIDCService } from "@zitadel/proto/zitadel/oidc/v2/oidc_service_pb";
import { OrganizationService } from "@zitadel/proto/zitadel/org/v2/org_service_pb";
import { SAMLService } from "@zitadel/proto/zitadel/saml/v2/saml_service_pb";
import { SessionService } from "@zitadel/proto/zitadel/session/v2/session_service_pb";
import { SettingsService } from "@zitadel/proto/zitadel/settings/v2/settings_service_pb";
import { UserService } from "@zitadel/proto/zitadel/user/v2/user_service_pb";
import { systemAPIToken } from "./api";
import { createServerTransport } from "./zitadel";

type ServiceClass =
  | typeof IdentityProviderService
  | typeof UserService
  | typeof OrganizationService
  | typeof SessionService
  | typeof OIDCService
  | typeof SettingsService
  | typeof SAMLService;

  export async function createServiceForHost<T extends ServiceClass>(
  service: T,
  serviceUrl: string,
) {
  let token: string | undefined;

  // 1. Cek jika berjalan dalam konteks multitenancy (System User)
  if (
    process.env.AUDIENCE &&
    process.env.SYSTEM_USER_ID &&
    process.env.SYSTEM_USER_PRIVATE_KEY
  ) {
    token = await systemAPIToken();
  } 
  // 2. Cek jika token diletakkan langsung di environment variable
  else if (process.env.ZITADEL_SERVICE_USER_TOKEN) {
    token = process.env.ZITADEL_SERVICE_USER_TOKEN;
  } 
  // 3. Cek jika menggunakan path file .pat (Solusi untuk masalah Anda)
  else if (process.env.ZITADEL_SERVICE_USER_TOKEN_FILE) {
    const filePath = process.env.ZITADEL_SERVICE_USER_TOKEN_FILE;
    try {
      if (fs.existsSync(filePath)) {
        token = fs.readFileSync(filePath, "utf8").trim();
      } else {
        console.error(`[ZITADEL] File token tidak ditemukan di: ${filePath}`);
      }
    } catch (err) {
      console.error(`[ZITADEL] Gagal membaca file token:`, err);
    }
  }

  // Validasi akhir sebelum membuat transport
  if (!serviceUrl) {
    throw new Error("ZITADEL Error: No instance URL found in environment variables.");
  }

  if (!token) {
    throw new Error(
      "ZITADEL Error: No token found. Please check ZITADEL_SERVICE_USER_TOKEN or ZITADEL_SERVICE_USER_TOKEN_FILE in your .env file."
    );
  }

  const transport = createServerTransport(token, serviceUrl);

  return createClientFor<T>(service)(transport);
}

// export async function createServiceForHost<T extends ServiceClass>(
//   service: T,
//   serviceUrl: string,
// ) {
//   let token;

//   // if we are running in a multitenancy context, use the system user token
//   if (
//     process.env.AUDIENCE &&
//     process.env.SYSTEM_USER_ID &&
//     process.env.SYSTEM_USER_PRIVATE_KEY
//   ) {
//     token = await systemAPIToken();
//   } else if (process.env.ZITADEL_SERVICE_USER_TOKEN) {
//     token = process.env.ZITADEL_SERVICE_USER_TOKEN;
//   }

//   if (!serviceUrl) {
//     throw new Error("No instance url found");
//   }

//   if (!token) {
//     throw new Error("No token found");
//   }

//   const transport = createServerTransport(token, serviceUrl);

//   return createClientFor<T>(service)(transport);
// }


